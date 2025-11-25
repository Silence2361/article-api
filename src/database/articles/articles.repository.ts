import { Article } from './articles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  IArticle,
  ICreateArticle,
  IFindArticlesQuery,
  IUpdateArticle,
  IPaginatedResult,
  IFindAllArticlesResponse,
} from './articles.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
  ) {}

  async createArticle(article: ICreateArticle): Promise<IArticle> {
    const newArticle = this.articlesRepository.create(article);
    return this.articlesRepository.save(newArticle);
  }

  async findArticleById(articleId: number): Promise<IArticle | null> {
    const article = await this.articlesRepository.findOne({
      where: { id: articleId },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        author: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      },
    });

    return article;
  }

  async findArticleByTitle(title: string): Promise<IArticle | null> {
    return this.articlesRepository.findOne({ where: { title } });
  }

  async findAllPaginated(
    query: IFindArticlesQuery,
  ): Promise<IPaginatedResult<IArticle>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.publishedAfter) {
      where.publishedAt = MoreThanOrEqual(new Date(query.publishedAfter));
    }
    if (query.publishedBefore) {
      where.publishedAt = LessThanOrEqual(new Date(query.publishedBefore));
    }
    if (query.authorId) {
      where.author = { id: query.authorId };
    }

    const [items, total] = await this.articlesRepository.findAndCount({
      where,
      order: { publishedAt: 'DESC' },
      skip,
      take: limit,
      relations: ['author'],
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        author: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      },
    });

    return {
      items: items,
      total,
      page,
      limit,
      hasNextPage: page * limit < total,
    };
  }

  async updateArticleById(
    articleId: number,
    article: IUpdateArticle,
  ): Promise<UpdateResult> {
    return this.articlesRepository.update({ id: articleId }, article);
  }

  async deleteArticleById(articleId: number): Promise<DeleteResult> {
    return this.articlesRepository.delete({ id: articleId });
  }
}
