import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '../jwt/jwt.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [JwtModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
