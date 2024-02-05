import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './utils/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();
