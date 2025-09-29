import { IsNotEmpty, IsString } from 'class-validator';

export class LocalizacaoDto {
  @IsString({ message: 'O bloco deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O bloco é obrigatório.' })
  bloco: string;

  @IsString({ message: 'O piso deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O piso é obrigatório.' })
  piso: string;

  @IsString({ message: 'A sala deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A sala é obrigatória.' })
  sala: string;
}
