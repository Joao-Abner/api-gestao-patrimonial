import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { AddressDto } from './address.dto';

/**
 * DTO para atualização de usuário
 * Todas as propriedades são opcionais, permitindo atualizações parciais
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string válida.' })
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'A idade deve ser um número inteiro.' })
  @Min(18, { message: 'A idade mínima é 18 anos.' })
  @Max(100, { message: 'A idade máxima é 100 anos.' })
  age?: number;

  @IsOptional()
  @ValidateNested({ message: 'O endereço deve ser um objeto válido.' })
  @Type(() => AddressDto)
  address?: AddressDto;
}