import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryUserDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'A página deve ser um número inteiro.' })
  @Min(1, { message: 'A página deve ser maior que 0.' })
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'O limite deve ser um número inteiro.' })
  @Min(1, { message: 'O limite deve ser maior que 0.' })
  @Max(100, { message: 'O limite máximo é 100.' })
  limit?: number;

  @IsOptional()
  @IsString({ message: 'O filtro de nome deve ser uma string válida.' })
  @Transform(({ value }) => value?.trim())
  name?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'A idade mínima deve ser um número inteiro.' })
  @Min(18, { message: 'A idade mínima deve ser 18 anos.' })
  minAge?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'A idade máxima deve ser um número inteiro.' })
  @Max(100, { message: 'A idade máxima deve ser 100 anos.' })
  maxAge?: number;

  @IsOptional()
  @IsString({ message: 'O filtro de cidade deve ser uma string válida.' })
  @Transform(({ value }) => value?.trim())
  city?: string;

  @IsOptional()
  @IsString({ message: 'O filtro de estado deve ser uma string válida.' })
  @Transform(({ value }) => value?.trim())
  state?: string;
}
