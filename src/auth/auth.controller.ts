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
    examples: {
      validoEmailComum: {
        summary: 'Email padrão',
        value: { email: 'usuario.comum@email.com', password: 'SenhaForte123' },
      },
      validoEmailComSubdominio: {
        summary: 'Email com subdomínio e senha no limite',
        value: {
          email: 'nome.sobrenome@departamento.empresa.com',
          password: '12345678',
        },
      },
      validoEmailComSimbolos: {
        summary: 'Email com "+" (sub-endereçamento)',
        value: { email: 'user+teste@gmail.com', password: 'minhasenha_987' },
      },
      invalidoFormatoEmail: {
        summary: 'Email com formato inválido',
        description: 'Falha: O email não está em um formato válido (@IsEmail).',
        value: { email: 'usuario-sem-arroba.com', password: 'SenhaForte123' },
      },
      invalidoSenhaCurta: {
        summary: 'Senha muito curta (7 caracteres)',
        description:
          'Falha: A senha não atinge o comprimento mínimo de 8 caracteres (@MinLength(8)).',
        value: { email: 'usuario.comum@email.com', password: '1234567' },
      },
      invalidoEmailAusente: {
        summary: 'Campo email ausente',
        description:
          'Falha: O campo "email" é obrigatório e não foi fornecido.',
        value: { password: 'SenhaForte123' },
      },
      invalidoSenhaAusente: {
        summary: 'Campo password ausente',
        description:
          'Falha: O campo "password" é obrigatório e não foi fornecido.',
        value: { email: 'usuario.comum@email.com' },
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
    // @Body('email') email: string,
    // @Body('password') password: string,
    @Body() loginDto: LoginDto,
  ) {
    const jwt = await this.authService.login(loginDto.email, loginDto.password);
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
