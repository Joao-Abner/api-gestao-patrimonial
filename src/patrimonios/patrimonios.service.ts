/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Patrimonio } from './interfaces/patrimonio.interface';

@Injectable()
export class PatrimoniosService {
  private patrimonios: Patrimonio[] = []; // Array para armazenar lista dos patrimônios em memória

  // Método para criar um novo patrimônio
  create(patrimonio: Patrimonio) {
    this.patrimonios.push(patrimonio);
    return patrimonio;
  }

  // Método para listar todos os patrimônios
  findAll() {
    return this.patrimonios;
  }

  // Método para encontrar um patrimônio específico pelo ID
  findOne(id: string) {
    const patrimonio = this.patrimonios.find(patrimonio => patrimonio.id === id);
    if (!patrimonio) {
      throw new NotFoundException('Patrimônio não encontrado');
    }
    return patrimonio;
  }

  // Método para atualizar um patrimônio existente pelo ID
  update(id: string, data: Partial<Patrimonio>) {
    const patrimonio = this.findOne(id);
    Object.assign(patrimonio, data);
    return patrimonio;
  }

  // Método para remover um patrimônio pelo ID
  remove(id: string) {
    const index = this.patrimonios.findIndex(patrimonio => patrimonio.id === id);
    if (index === -1) {
      throw new NotFoundException('Patrimônio não encontrado');
    }
    this.patrimonios.splice(index, 1);
    return { message: 'Patrimônio removido com sucesso' };
  }
}
