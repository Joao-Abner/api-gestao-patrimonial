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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PatrimoniosService } from './patrimonios.service';
// import type { Patrimonio } from './interfaces/patrimonio.interface';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('patrimonios')
@Controller('patrimonios')
export class PatrimoniosController {
  constructor(private readonly patrimoniosService: PatrimoniosService) {} // Injeção do serviço de patrimônios

  // Método POST para criar um novo patrimônio
  @Post()
  @HttpCode(201)
  create(@Body() createPatrimonioDto: CreatePatrimonioDto) {
    return this.patrimoniosService.create(createPatrimonioDto);
  }

  // Método GET com filtro e paginação
  @Get()
  findAll(@Query() filters: QueryFilterDto) {
    // O DTO com @Transform já converte page e limit para number
    return this.patrimoniosService.findAll(filters);
  }

  // Método GET para encontrar um patrimônio específico pelo ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // 3. O ParseIntPipe converte o parâmetro 'id' de string para number
    return this.patrimoniosService.findOne(id);
  }

  // Método PUT para atualizar um patrimônio existente pelo ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, // Converte para number
    @Body() updatePatrimonioDto: UpdatePatrimonioDto,
  ) {
    return this.patrimoniosService.update(id, updatePatrimonioDto);
  }

  // Método PATCH para atualização parcial
  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number, // Converte para number
    @Body() updatePatrimonioDto: UpdatePatrimonioDto,
  ) {
    return this.patrimoniosService.update(id, updatePatrimonioDto);
  }

  // Método DELETE para remover um patrimônio pelo ID
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    // Converte para number
    return this.patrimoniosService.remove(id);
  }
}
