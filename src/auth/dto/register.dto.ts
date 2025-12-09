import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'professor@teste.com',
    description: 'Email para login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SenhaForte123', description: 'Senha do usuário' })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    example: 'Professor Avaliador',
    description: 'Nome completo',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
