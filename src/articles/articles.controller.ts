import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleResponseRto } from './rto/create-article-response-rto';
import { CreateArticleDto } from './dto/create-article-dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindArticleByIdResponseRto } from './rto/find-article-by-id-reponse.rto';
import { PaginatedArticlesResponseRto } from './rto/paginated-articles-response-rto';
import { FindArticlesQueryDto } from './dto/find-articles-query-dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user-id.decorator';
import { JwtPayload } from '../jwt/jwt.payload';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 201, type: CreateArticleResponseRto })
  @ApiResponse({
    status: 409,
    description: 'Article with this title already exists',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createArticle(
    @Body() article: CreateArticleDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<CreateArticleResponseRto> {
    return this.articlesService.createArticle(article, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get articles with pagination and filters' })
  @ApiResponse({ status: 200, type: PaginatedArticlesResponseRto })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'publishedAfter',
    required: false,
    example: '2025-01-01T00:00:00Z',
  })
  @ApiQuery({
    name: 'publishedBefore',
    required: false,
    example: '2025-12-31T23:59:59Z',
  })
  @ApiQuery({ name: 'authorId', required: false, example: 1 })
  async findAllArticles(
    @Query() query: FindArticlesQueryDto,
  ): Promise<PaginatedArticlesResponseRto> {
    return this.articlesService.findAllArticles(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiResponse({ status: 200, type: FindArticleByIdResponseRto })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiParam({ name: 'id', description: 'Article ID', example: 1 })
  async findArticleById(
    @Param('id') id: number,
  ): Promise<FindArticleByIdResponseRto | null> {
    return this.articlesService.findArticleById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update article by ID' })
  @ApiResponse({ status: 200, description: 'Article successfully updated' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'Article ID', example: 1 })
  async updateArticleById(
    @Param('id') id: number,
    @Body() article: UpdateArticleDto,
  ): Promise<void> {
    return this.articlesService.updateArticleById(id, article);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete article by ID' })
  @ApiResponse({ status: 200, description: 'Article successfully deleted' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'Article ID', example: 1 })
  async deleteArticleById(@Param('id') id: number): Promise<void> {
    return this.articlesService.deleteArticleById(id);
  }
}
