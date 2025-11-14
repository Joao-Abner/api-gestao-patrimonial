import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // @ApiProperty({ example: 'joao@email.com' })
  // email: string;

  @ApiProperty({
    description: 'Email de login do usuário',
    example: 'usuario@email.com',
  })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @ApiProperty({
    description: 'Senha de login do usuário',
    example: 'senhaSegura123',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
  // @ApiProperty({ example: '12345678' })
  // password: string;
}
