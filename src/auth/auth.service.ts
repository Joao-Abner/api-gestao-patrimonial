import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // método de registro de novo usuário
  async register(email: string, password: string, name?: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email já está em uso.');
    }

    // gera um hash para a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria um novo usuário no banco de dados (usando o model User do Prisma)
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name || '',
      },
    });

    // remova o campo senha do objeto retornado, por segurança
    // delete (user as { password?: string }).password;
    // return user;

    // Em vez de usar 'delete', retornando um novo objeto:
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      //  'password' e 'age' simplesmente não são incluídos
    };
  }

  // método de login: valida as credenciais e retorna um token JWT
  async login(email: string, password: string) {
    // busca o usuário pelo email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    // compara a senha fornecida com o hash salvo
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // credenciais ok, gerar JWT
    // (payload pode incluir outras informações úteis do usuário)
    const payload = { sub: user.id, email: user.email, role: user.role }; // 'sub' é padrão JWT para subject (id do usuário)
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
