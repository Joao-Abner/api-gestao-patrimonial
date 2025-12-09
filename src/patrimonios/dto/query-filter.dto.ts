import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryFilterDto {
  @ApiProperty({ example: 1, required: false, description: 'Número da página' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber({}, { message: 'A página deve ser um número válido.' })
  page?: number;

  @ApiProperty({ example: 5, required: false, description: 'Itens por página' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber({}, { message: 'O limite deve ser um número válido.' })
  limit?: number;

  @ApiProperty({
    example: 'ativo',
    enum: ['ativo', 'inativo', 'manutencao'],
    required: false,
  })
  @IsOptional()
  @IsIn(['ativo', 'inativo', 'manutencao'], {
    message: "O status deve ser 'ativo', 'inativo' ou 'manutencao'.",
  })
  status?: 'ativo' | 'inativo' | 'manutencao';

  @ApiProperty({
    example: 'Dell',
    required: false,
    description: 'Filtrar por nome',
  })
  @IsOptional()
  @IsString({ message: 'O filtro deve ser uma string válida.' })
  @Transform(({ value }: { value: string }) => value?.trim())
  filter?: string; // Adicionando o filtro de busca por nome
}
