import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // TODO set this
    MongooseModule.forRoot('mongodb://localhost:27017/product', {
      connectionName: 'products',
    }),
  ],
})
export class AppModule {}
