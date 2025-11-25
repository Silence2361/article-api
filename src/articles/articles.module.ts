import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '../jwt/jwt.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [DatabaseModule, JwtModule, RedisModule],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
