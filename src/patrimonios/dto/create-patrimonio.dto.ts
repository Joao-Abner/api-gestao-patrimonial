import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreatePatrimonioDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  numeroPatrimonio: number;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  localizacao: string;

  @IsString()
  @IsNotEmpty()
  responsavel: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['ativo', 'inativo', 'manutencao'])
  status: 'ativo' | 'inativo' | 'manutencao';

  @IsString()
  @IsOptional()
  observacoes?: string;
}
