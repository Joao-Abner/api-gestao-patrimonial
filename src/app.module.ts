// O que faz este módulo?
// Este é o módulo raiz da aplicação NestJS. Ele importa os módulos Core e Shared,
// e define o controlador e serviço principais da aplicação.

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PatrimoniosModule } from './patrimonios/patrimonios.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ErrorsModule } from './errors/errors.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    PatrimoniosModule,
    UsersModule,
    ErrorsModule,
    PrismaModule,
    PrismaService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
