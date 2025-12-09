import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO para atualização de usuário
 * Todas as propriedades são opcionais, permitindo atualizações parciais
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'João Silva Editado' })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string válida.' })
  name?: string;

  @ApiPropertyOptional({ example: 'novo.email@teste.com' })
  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  email?: string;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'A idade deve ser um número inteiro.' })
  @Min(18, { message: 'A idade mínima é 18 anos.' })
  @Max(100, { message: 'A idade máxima é 100 anos.' })
  age?: number;
}
