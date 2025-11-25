import { ApiProperty } from '@nestjs/swagger';

export class FindUserByIdResponseRto {
  @ApiProperty({ example: 1, description: 'User Id' })
  id: number;

  @ApiProperty({
    example: 'test@example.com',
    description: 'Email',
  })
  email: string;

  @ApiProperty({ example: 'Name', description: 'User Name' })
  name: string;

  @ApiProperty({
    example: '2025-04-01T12:00:00Z',
    description: 'Created at',
  })
  createdAt: Date;
}
