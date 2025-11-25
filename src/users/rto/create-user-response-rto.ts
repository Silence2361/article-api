import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseRto {
  @ApiProperty({ example: 1, description: 'User Id' })
  id: number;
}
