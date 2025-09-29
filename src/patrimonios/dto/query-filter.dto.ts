import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryFilterDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber({}, { message: 'A página deve ser um número válido.' })
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber({}, { message: 'O limite deve ser um número válido.' })
  limit?: number;

  @IsOptional()
  @IsIn(['ativo', 'inativo', 'manutencao'], { message: "O status deve ser 'ativo', 'inativo' ou 'manutencao'." })
  status?: 'ativo' | 'inativo' | 'manutencao';

  @IsOptional()
  @IsString({ message: 'O filtro deve ser uma string válida.' })
  @Transform(({ value }) => value.trim())
  filter?: string; // Adicionando o filtro de busca por nome
}
