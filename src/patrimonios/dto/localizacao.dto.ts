import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocalizacaoDto {
  @ApiProperty({ example: 'Bloco C' })
  @IsString({ message: 'O bloco deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O bloco é obrigatório.' })
  bloco: string;

  @ApiProperty({ example: '2º Piso' })
  @IsString({ message: 'O piso deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O piso é obrigatório.' })
  piso: string;

  @ApiProperty({ example: 'Sala 204' })
  @IsString({ message: 'A sala deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A sala é obrigatória.' })
  sala: string;
}
