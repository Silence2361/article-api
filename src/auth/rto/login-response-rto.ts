import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseRto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR...',
    description: 'JWT token',
  })
  access_token: string;
}
