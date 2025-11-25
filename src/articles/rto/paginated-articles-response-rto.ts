import { ApiProperty } from '@nestjs/swagger';
import { FindAllArticlesResponseRto } from './find-all-articles-response-rto';
import { FindArticleByIdResponseRto } from './find-article-by-id-reponse.rto';

export class PaginatedArticlesResponseRto {
  @ApiProperty({
    type: [FindArticleByIdResponseRto],
    description: 'List of articles',
  })
  items: FindAllArticlesResponseRto[];

  @ApiProperty({ example: 20, description: 'Total articles count' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page' })
  page: number;

  @ApiProperty({ example: 10, description: 'Articles count per page' })
  limit: number;

  @ApiProperty({ example: true, description: 'Has next page' })
  hasNextPage: boolean;
}
