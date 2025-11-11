import {
  BadRequestException,
  Controller,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Query,
  UseFilters,
} from '@nestjs/common';
import { Get, Param, NotFoundException } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { CustomException } from './custom-exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('errors')
@Controller('errors')
@UseFilters(HttpExceptionFilter)
export class ErrorsController {
  @Get('/custom-error')
  throwCustomError() {
    throw new CustomException();
  }
  @Get('http-exception-simple')
  throwHttpExceptionSimple() {
    throw new HttpException('Acesso proibido', HttpStatus.FORBIDDEN);
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (id !== '1') {
      throw new NotFoundException('Recurso não encontrado');
    }
    return { id, message: 'Recurso encontrado' };
  }
}
