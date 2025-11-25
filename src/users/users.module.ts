import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
