import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Patrimonios API com Swagger')
    .setDescription('API para gerenciamento de patrimônios')
    .setVersion('1.0')
    .addBearerAuth() // para habilitar autenticação via token JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
  // ID21: Middleware/Configuração - Habilitar CORS para acesso externo (Frontend/Swagger Web)
  app.enableCors(); 

  // ID17: Variáveis de Ambiente - Usar a porta do provedor de nuvem (Railway) ou 3000 localmente
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
