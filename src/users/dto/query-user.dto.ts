import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryUserDto {
  @ApiPropertyOptional({ example: 1, description: 'Número da página' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Itens por página' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ example: 'João', description: 'Filtrar por nome' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 18, description: 'Idade mínima' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(18)
  minAge?: number;

  @ApiPropertyOptional({ example: 60, description: 'Idade máxima' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  maxAge?: number;
}
