import {
  Injectable,
  // UnauthorizedException,
  ConflictException,
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

    // Remova o campo senha do objeto retornado, por segurança
    delete (user as { password?: string }).password;
    return user;
  }
}
