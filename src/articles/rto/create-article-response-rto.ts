import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleResponseRto {
  @ApiProperty({ example: 1, description: 'Article ID' })
  id: number;
}
