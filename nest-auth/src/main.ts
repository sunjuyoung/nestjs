import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프 설정
  app.use(cookieParser()); // cookieParser 미들웨어 등록
  await app.listen(3000);
}
bootstrap();
