// src/patrimonios/dto/update-patrimonio.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatrimonioDto {
  @ApiProperty({
    example: 'Notebook Dell Latitude 5420 (Atualizado)',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome?: string;

  @ApiProperty({ example: 'Nova descrição para o bem...', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ example: 2025099, required: false })
  @IsNumber()
  @IsNotEmpty()
  numeroPatrimonio: number;

  @ApiProperty({ example: 4200.0, required: false })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  valor?: number;

  @ApiProperty({
    example: '{ "bloco": "A", "piso": "2", "sala": "202" }',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  localizacao?: string;

  @ApiProperty({ example: 'Observação atualizada', required: false })
  @IsString()
  @IsOptional()
  observacao?: string;

  @ApiProperty({ example: 'Carlos Gerente', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  responsavel?: string;

  @ApiProperty({
    example: 'manutencao',
    enum: ['ativo', 'inativo', 'manutencao'],
    required: false,
  })
  @IsIn(['ativo', 'inativo', 'manutencao'])
  @IsNotEmpty()
  @IsOptional()
  status?: 'ativo' | 'inativo' | 'manutencao';
}
