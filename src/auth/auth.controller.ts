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
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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
  @ApiBody({ type: RegisterDto })
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
  @ApiOperation({
    summary: 'Realiza login com email e senha',
    description: 'Retorna um token JWT em caso de sucesso.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Dados de login do usuário',
    examples: {
      // Exemplo de corpo de requisição válido
      loginValido: {
        summary: 'Login Válido',
        value: {
          email: 'usuario@email',
          password: 'senhaSegura123',
        } as LoginDto,
      },
      // Exemplo inválido (pelo ValidationPipe)
      emailInvalido: {
        summary: 'Email com formato inválido',
        description: 'Resultará em um erro 400 Bad Request.',
        value: {
          email: 'email-invalido.com',
          password: 'senhaForte123',
        } as LoginDto,
      },
      // Exemplo inválido (pelo ValidationPipe)
      senhaAusente: {
        summary: 'Senha ausente',
        description: 'Resultará em um erro 400 Bad Request.',
        value: {
          email: 'usuario@email.com',
        } as LoginDto,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso. Retorna o token de acesso.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Requisição inválida (Bad Request). O corpo (body) não atende aos requisitos de validação (ex: email inválido, senha ausente).',
  })
  @ApiResponse({
    status: 401,
    description:
      'Não autorizado (Unauthorized). Credenciais inválidas (email ou senha incorretos).',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
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
