import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocalizacaoDto } from '../dto/localizacao.dto';

export class CreatePatrimonioDto {
  @ApiProperty({ example: 'Notebook Dell Latitude 5420' })
  @IsString({ message: 'O nome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @ApiProperty({ example: 'Notebook para uso da equipe de TI' })
  @IsString({ message: 'A descrição deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  descricao: string;

  @ApiProperty({ example: 2025001 })
  @IsNumber({}, { message: 'O número do patrimônio deve ser numérico.' })
  @IsNotEmpty({ message: 'O número do patrimônio é obrigatório.' })
  numeroPatrimonio: number;

  @ApiProperty({ example: 4500.0 })
  @IsNumber({}, { message: 'O valor deve ser numérico.' })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  valor: number;

  @ApiProperty({ type: LocalizacaoDto })
  @IsNotEmpty({ message: 'A localização é obrigatória.' })
  @ValidateNested({ message: 'A localização deve ser um objeto válido.' }) // Diz ao class-validator para validar o objeto aninhado
  @Type(() => LocalizacaoDto) // Diz ao class-transformer como criar uma instância de LocalizacaoDto
  localizacao: LocalizacaoDto;

  @ApiProperty({ example: 'Alice Silva' })
  @IsString({ message: 'O responsável deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O responsável é obrigatório.' })
  responsavel: string;

  @ApiProperty({ example: 'ativo', enum: ['ativo', 'inativo', 'manutencao'] })
  @IsString({ message: 'O status deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  @IsIn(['ativo', 'inativo', 'manutencao'], {
    message: "O status deve ser 'ativo', 'inativo' ou 'manutencao'.",
  })
  status: 'ativo' | 'inativo' | 'manutencao';

  @ApiPropertyOptional({ example: 'Equipamento entregue com carregador.' })
  @IsString({ message: 'As observações devem ser uma string válida.' })
  @IsOptional()
  observacoes?: string;
}
