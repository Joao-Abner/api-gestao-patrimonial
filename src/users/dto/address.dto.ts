import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsString({ message: 'A cidade deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  city: string;

  @IsString({ message: 'O estado deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  state: string;
}
