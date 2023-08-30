import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule {}
