import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseRto {
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email',
  })
  email: string;
}
