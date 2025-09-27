import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryFilterDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsIn(['ativo', 'inativo', 'manutencao'])
  status?: 'ativo' | 'inativo' | 'manutencao';
}
