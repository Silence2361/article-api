import { ApiProperty } from '@nestjs/swagger';

export class FindAllArticlesResponseRto {
  @ApiProperty({ example: 1, description: 'Article ID' })
  id: number;

  @ApiProperty({ example: 'Article title', description: 'Article title' })
  title: string;

  @ApiProperty({
    example: 'Article description',
    description: 'Article description',
  })
  description: string;

  @ApiProperty({
    example: '2025-04-04T12:00:00Z',
    description: 'Article published at',
  })
  publishedAt: Date;
}
