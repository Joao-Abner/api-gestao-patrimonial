import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Converte automaticamente os tipos (ex: string para number)
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Lança um erro se propriedades não definidas forem encontradas
      transformOptions: {
        enableImplicitConversion: true, // Converte automaticamente os tipos (ex: string para number)
      },
    }),
  );
  await app.listen(3000);
}
void bootstrap();
