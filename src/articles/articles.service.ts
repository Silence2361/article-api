import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateArticle,
  ICreateArticleResponse,
  IFindAllArticlesResponse,
  IFindArticleByIdResponse,
  IFindArticlesQuery,
  IUpdateArticle,
  IPaginatedResult,
  ICreateArticleService,
} from '../database/articles/articles.interface';
import { ArticleRepository } from '../database/articles/articles.repository';
import { UserRepository } from '../database/users/users.repository';
import Redis from 'ioredis';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async createArticle(
    article: ICreateArticleService,
    authorId: number,
  ): Promise<ICreateArticleResponse> {
    const author = await this.userRepository.findUserById(authorId);

    if (!author) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }

    const existingArticle = await this.articleRepository.findArticleByTitle(
      article.title,
    );

    if (existingArticle) {
      throw new ConflictException('Article with this title already exists');
    }

    const articleData: ICreateArticle = {
      ...article,
      author,
    };

    const newArticle = await this.articleRepository.createArticle(articleData);

    await this.invalidateCache();
    return { id: newArticle.id };
  }

  async findAllArticles(
    query: IFindArticlesQuery,
  ): Promise<IPaginatedResult<IFindAllArticlesResponse>> {
    const cacheKey = `articles:${JSON.stringify(query)}`;

    const cached = await this.redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const result = await this.articleRepository.findAllPaginated(query);

    await this.redisClient.set(cacheKey, JSON.stringify(result), 'EX', 10);

    return result;
  }

  async findArticleById(articleId: number): Promise<IFindArticleByIdResponse> {
    const cacheKey = `article:${articleId}`;

    const cached = await this.redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const article = await this.articleRepository.findArticleById(articleId);

    if (!article) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }

    await this.redisClient.set(cacheKey, JSON.stringify(article), 'EX', 10);

    return article;
  }

  async updateArticleById(
    articleId: number,
    articleData: IUpdateArticle,
  ): Promise<void> {
    const article = await this.articleRepository.findArticleById(articleId);

    if (!article) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }
    await this.articleRepository.updateArticleById(articleId, articleData);

    await this.invalidateCache(articleId);
  }

  async deleteArticleById(articleId: number): Promise<void> {
    const article = await this.articleRepository.findArticleById(articleId);

    if (!article) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }
    await this.articleRepository.deleteArticleById(articleId);

    await this.invalidateCache(articleId);
  }

  async invalidateCache(articleId?: number): Promise<void> {
    if (articleId) {
      const articleKey = `article:${articleId}`;
      await this.redisClient.del(articleKey);
    }

    const keys = await this.redisClient.keys('articles:*');
    if (keys.length > 0) {
      await this.redisClient.del(...keys);
    }
  }
}
