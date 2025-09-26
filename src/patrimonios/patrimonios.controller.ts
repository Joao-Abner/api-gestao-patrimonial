import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PatrimoniosService } from './patrimonios.service';
import type { Patrimonio } from './interfaces/patrimonio.interface';

@Controller('patrimonios')
export class PatrimoniosController {
  constructor(private readonly patrimoniosService: PatrimoniosService) {} // Injeção do serviço de patrimônios

  // Método POST para criar um novo patrimônio
  @Post()
  @HttpCode(201)
  create(@Body() body: Patrimonio) {
    return this.patrimoniosService.create(body);
  }

  // Método GET para listar todos os patrimônios
  @Get()
  findAll() {
    return this.patrimoniosService.findAll();
  }

  // Método GET para encontrar um patrimônio específico pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patrimoniosService.findOne(id);
  }

  // Método PUT para atualizar um patrimônio existente pelo ID
  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Patrimonio>) {
    return this.patrimoniosService.update(id, body);
  }

  // Método PATCH
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() body: Partial<Patrimonio>) {
    return this.patrimoniosService.update(id, body);
  }

  // Método DELETE para remover um patrimônio pelo ID
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.patrimoniosService.remove(id);
  }
}
