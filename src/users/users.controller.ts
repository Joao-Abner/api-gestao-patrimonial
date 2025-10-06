import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CustomExceptionFilter } from 'src/custom-exception/custom-exception.filter';

@Controller('users')
@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /users - Criar um novo usuário
   * @param createUserDto - Dados do usuário a ser criado
   * @returns Usuário criado com ID gerado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * GET /users - Listar usuários com filtros e paginação
   * @param filters - Filtros de busca e paginação
   * @returns Lista paginada de usuários com metadados
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() filters: QueryUserDto) {
    return this.usersService.findAll(filters);
  }

  /**
   * GET /users/statistics - Obter estatísticas dos usuários
   * @returns Estatísticas gerais dos usuários
   */
  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  getStatistics() {
    return this.usersService.getStatistics();
  }

  /**
   * GET /users/:id - Buscar usuário específico por ID
   * @param id - ID do usuário
   * @returns Usuário encontrado
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    // 5. Adiciona a lógica para lançar a exceção
    if (id !== 1) {
      throw new NotFoundException(
        `O usuário com ID ${id} não foi encontrado para este teste.`,
      );
    }
    return this.usersService.findOne(id);
  }

  /**
   * PUT /users/:id - Atualizar usuário completamente
   * @param id - ID do usuário
   * @param updateUserDto - Dados completos do usuário
   * @returns Usuário atualizado
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * PATCH /users/:id - Atualizar usuário parcialmente
   * @param id - ID do usuário
   * @param updateUserDto - Dados parciais do usuário
   * @returns Usuário atualizado
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * DELETE /users/:id - Remover usuário
   * @param id - ID do usuário
   * @returns Sem conteúdo (204)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
