import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'Article title', description: 'Article title' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;

  @ApiProperty({
    example: 'Article description',
    description: 'Article description',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  description: string;
}
