import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { Get, Param, NotFoundException } from '@nestjs/common';

@Controller('errors')
export class ErrorsController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (id !== '1') {
      throw new NotFoundException('Recurso não encontrado');
    }
    return { id, message: 'Recurso encontrado' };
  }
  @Get('bad-request')
  badRequest(@Query('param') param: string) {
    if (!param) {
      throw new BadRequestException(
        'Parâmetro "param" é obrigatório na query string',
      );
    }
    return { message: 'Requisição válida', param };
  }

  @Get('admin-only')
  adminOnly() {
    const userRole: string = 'user'; // Simulação de papel do usuário
    if (userRole !== 'admin') {
      throw new ForbiddenException(
        'Acesso negado: apenas administradores podem acessar este recurso',
      );
    }
    return { message: 'Bem-vindo, administrador!' };
  }
}
