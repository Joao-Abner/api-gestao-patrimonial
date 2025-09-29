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
  @IsString({ message: 'O nome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsString({ message: 'A descrição deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  descricao: string;

  @IsNumber({}, { message: 'O número do patrimônio deve ser numérico.' })
  @IsNotEmpty({ message: 'O número do patrimônio é obrigatório.' })
  numeroPatrimonio: number;

  @IsNumber({}, { message: 'O valor deve ser numérico.' })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  valor: number;

  @IsNotEmpty({ message: 'A localização é obrigatória.' })
  @ValidateNested({ message: 'A localização deve ser um objeto válido.' }) // Diz ao class-validator para validar o objeto aninhado
  @Type(() => LocalizacaoDto) // Diz ao class-transformer como criar uma instância de LocalizacaoDto
  localizacao: LocalizacaoDto;

  @IsString({ message: 'O responsável deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O responsável é obrigatório.' })
  responsavel: string;

  @IsString({ message: 'O status deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  @IsIn(['ativo', 'inativo', 'manutencao'], { message: "O status deve ser 'ativo', 'inativo' ou 'manutencao'." })
  status: 'ativo' | 'inativo' | 'manutencao';

  @IsString({ message: 'As observações devem ser uma string válida.' })
  @IsOptional()
  observacoes?: string;
}
