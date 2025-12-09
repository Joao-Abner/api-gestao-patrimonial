import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  @IsString({ message: 'O nome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiProperty({ example: 'joao.silva@email.com' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @ApiProperty({ example: 25, description: 'Idade do usuário' })
  @Type(() => Number)
  @IsInt({ message: 'A idade deve ser um número inteiro.' })
  @Min(18, { message: 'A idade mínima é 18 anos.' })
  @Max(100, { message: 'A idade máxima é 100 anos.' })
  age: number;
}
