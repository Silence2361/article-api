import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: "User's email",
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'Name', description: "User's name" })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(16)
  name: string;

  @ApiProperty({
    example: 'securePassword123',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(28)
  password: string;
}
