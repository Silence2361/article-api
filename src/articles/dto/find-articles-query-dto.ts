import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class FindArticlesQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Articles count per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 10;

  @ApiPropertyOptional({
    example: '2025-01-01T00:00:00Z',
    description: 'Filter by published after',
  })
  @IsOptional()
  @Type(() => String)
  publishedAfter?: string;

  @ApiPropertyOptional({
    example: '2025-12-31T23:59:59Z',
    description: 'Filter by published before',
  })
  @IsOptional()
  @Type(() => String)
  publishedBefore?: string;

  @ApiPropertyOptional({ example: 3, description: 'Author ID for filtering' })
  @IsOptional()
  @Type(() => Number)
  authorId?: number;
}
