// src/patrimonios/dto/update-patrimonio.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';

export class UpdatePatrimonioDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsNotEmpty()
  numeroPatrimonio: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  valor?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  localizacao?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  responsavel?: string;

  @IsIn(['ativo', 'inativo', 'manutencao'])
  @IsNotEmpty()
  @IsOptional()
  status?: 'ativo' | 'inativo' | 'manutencao';
}
