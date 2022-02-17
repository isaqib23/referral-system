import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION),
    UsersModule
  ]
})
export class AppModule {}
