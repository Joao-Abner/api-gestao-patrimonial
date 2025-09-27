import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryFilterDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsIn(['ativo', 'inativo', 'manutencao'])
  status?: 'ativo' | 'inativo' | 'manutencao';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  filtro?: string; // Adicionando o filtro de busca por nome
}
