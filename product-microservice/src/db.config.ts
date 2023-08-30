import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // TODO set this
    MongooseModule.forRoot('mongodb://localhost/test', {
      connectionName: 'products',
    }),
  ],
})
export class AppModule {}
