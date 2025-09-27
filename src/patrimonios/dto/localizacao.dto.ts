import { IsNotEmpty, IsString } from 'class-validator';

export class LocalizacaoDto {
  @IsString()
  @IsNotEmpty()
  bloco: string;

  @IsString()
  @IsNotEmpty()
  piso: string;

  @IsString()
  @IsNotEmpty()
  sala: string;
}
