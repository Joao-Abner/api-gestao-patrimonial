import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LocalizacaoDto } from '../dto/localizacao.dto';

export class CreatePatrimonioDto {
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

  @IsNotEmpty()
  @ValidateNested() // Diz ao class-validator para validar o objeto aninhado
  @Type(() => LocalizacaoDto) // Diz ao class-transformer como criar uma instância de LocalizacaoDto
  localizacao: LocalizacaoDto;

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
