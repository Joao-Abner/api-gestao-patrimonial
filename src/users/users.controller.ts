import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CustomExceptionFilter } from 'src/custom-exception/custom-exception.filter';
import { Prisma } from '@prisma/client';

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

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(/*@Query() filters: QueryUserDto*/) {
    // Parâmetro Query comentado
    return await this.usersService.findAll(/*filters*/); // Argumento comentado
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data: Prisma.UserUpdateInput = updateUserDto;
    return await this.usersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
  }
}
