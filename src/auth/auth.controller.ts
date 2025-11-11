import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    name: string;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // por padrão Post retorna 201 Createds
  @ApiOperation({ summary: 'Registra um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 409, description: 'Usuário já existe' })
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name?: string,
  ) {
    const newUser = await this.authService.register(email, password, name);
    return newUser;
  }
  @Post('login')
  @HttpCode(HttpStatus.OK) // define o status como 200 OK explicitamente
  @ApiOperation({ summary: 'Realiza login com email e senha' })
  @ApiResponse({ status: 201, description: 'Login com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const jwt = await this.authService.login(email, password);
    return jwt; // retornará { access_token: '...' }
  }

  // rota protegida com JWT guard
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('perfil')
  @ApiOperation({ summary: 'Retorna informações do usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário logado' })
  getPerfil(@Req() request: RequestWithUser) {
    const usuarioLogado = request.user;
    return {
      message: 'Você acessou uma rota protegida!',
      user: usuarioLogado,
    };
  }
}
