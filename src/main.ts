import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(UsersModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
