import { Injectable, NotFoundException } from '@nestjs/common';
import { Patrimonio } from './interfaces/patrimonio.interface';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { QueryFilterDto } from './dto/query-filter.dto';

@Injectable()
export class PatrimoniosService {
  private patrimonios: Patrimonio[] = []; // Array para armazenar lista dos patrimônios em memória

  // Método para criar um novo patrimônio
  create(createPatrimonioDto: CreatePatrimonioDto): Patrimonio {
    const novoPatrimonio: Patrimonio = {
      id: this.patrimonios.length + 1, // Gera um ID único sequencial
      ...createPatrimonioDto,
    };
    this.patrimonios.push(novoPatrimonio);
    return novoPatrimonio;
  }


  // Método para listar todos os patrimônios com filtro e paginação
  findAll(filters: QueryFilterDto): Patrimonio[] {
    const { filtro, status, page = 1, limit = 5 } = filters;
    let resultado = this.patrimonios;

    // 1. Aplica o filtro por status, se existir
    if (status) {
      resultado = resultado.filter((p) => p.status === status);
    }

    // 2. Aplica o filtro por nome (filtro de busca), se existir
    if (filtro) {
      resultado = resultado.filter((p) =>
        p.nome.toLowerCase().includes(filtro.toLowerCase()),
      );
    }

    // 3. Aplica a paginação
    return resultado.slice((page - 1) * limit, page * limit);
  }

  // Método para encontrar um patrimônio específico pelo ID
  findOne(id: number): Patrimonio {
    const patrimonio = this.patrimonios.find((p) => p.id === id);
    if (!patrimonio) {
      throw new NotFoundException('Patrimônio não encontrado.');
    }
    return patrimonio;
  }

  // Método para atualizar um patrimônio existente pelo ID
  update(id: number, updatePatrimonioDto: UpdatePatrimonioDto): Patrimonio {
    const patrimonio = this.findOne(id);
    Object.assign(patrimonio, updatePatrimonioDto);
    return patrimonio;
  }

  // Método para remover um patrimônio pelo ID
  remove(id: number) {
    const index = this.patrimonios.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Patrimônio não encontrado');
    }
    this.patrimonios.splice(index, 1);
    return { message: 'Patrimônio removido com sucesso' };
  }
}
