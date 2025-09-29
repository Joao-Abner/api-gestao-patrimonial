import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './interfaces/user.interface';

/**
 * Serviço responsável pela gestão de usuários
 * Implementa operações CRUD e funcionalidades de busca/filtros
 */
@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  // Constantes para configuração
  private static readonly DEFAULT_PAGE = 1;
  private static readonly DEFAULT_LIMIT = 10;
  private static readonly PRECISION_DECIMALS = 100;

  /**
   * Cria um novo usuário
   * @param createUserDto - Dados para criação do usuário
   * @returns O usuário criado
   * @throws BadRequestException se já existir usuário com o mesmo nome
   */
  create(createUserDto: CreateUserDto): User {
    this.validateUniqueUserName(createUserDto.name);

    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Busca usuários com filtros e paginação
   * @param filters - Filtros de busca e parâmetros de paginação
   * @returns Lista paginada de usuários com metadados
   */
  findAll(filters: QueryUserDto): { users: User[]; total: number; page: number; limit: number } {
    const { 
      page = UsersService.DEFAULT_PAGE, 
      limit = UsersService.DEFAULT_LIMIT 
    } = filters;

    const filteredUsers = this.applyFilters(filters);
    const paginatedResult = this.applyPagination(filteredUsers, page, limit);

    return {
      users: paginatedResult,
      total: filteredUsers.length,
      page,
      limit,
    };
  }

  /**
   * Busca um usuário por ID
   * @param id - ID do usuário
   * @returns O usuário encontrado
   * @throws NotFoundException se o usuário não for encontrado
   */
  findOne(id: number): User {
    const user = this.findUserById(id);
    return user;
  }

  /**
   * Atualiza um usuário existente
   * @param id - ID do usuário a ser atualizado
   * @param updateUserDto - Dados para atualização
   * @returns O usuário atualizado
   * @throws NotFoundException se o usuário não for encontrado
   * @throws BadRequestException se o novo nome já existir
   */
  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.findUserIndexById(id);
    
    if (updateUserDto.name) {
      this.validateUniqueUserNameForUpdate(updateUserDto.name, id);
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  /**
   * Remove um usuário
   * @param id - ID do usuário a ser removido
   * @throws NotFoundException se o usuário não for encontrado
   */
  remove(id: number): void {
    const userIndex = this.findUserIndexById(id);
    this.users.splice(userIndex, 1);
  }

  /**
   * Obtém estatísticas dos usuários
   * @returns Estatísticas gerais dos usuários cadastrados
   */
  getStatistics(): { total: number; averageAge: number; citiesCount: number } {
    const total = this.users.length;
    const averageAge = this.calculateAverageAge();
    const uniqueCities = new Set(this.users.map(user => user.address.city)).size;

    return {
      total,
      averageAge,
      citiesCount: uniqueCities,
    };
  }

  // ==================== MÉTODOS PRIVADOS ====================

  /**
   * Valida se o nome do usuário é único
   * @param name - Nome a ser validado
   * @throws BadRequestException se já existir usuário com o mesmo nome
   */
  private validateUniqueUserName(name: string): void {
    const existingUser = this.users.find(
      user => user.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existingUser) {
      throw new BadRequestException('Já existe um usuário com este nome.');
    }
  }

  /**
   * Valida se o nome do usuário é único para atualização
   * @param name - Nome a ser validado
   * @param excludeId - ID do usuário a ser excluído da validação
   * @throws BadRequestException se já existir usuário com o mesmo nome
   */
  private validateUniqueUserNameForUpdate(name: string, excludeId: number): void {
    const existingUser = this.users.find(
      user => user.id !== excludeId && user.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existingUser) {
      throw new BadRequestException('Já existe um usuário com este nome.');
    }
  }

  /**
   * Busca um usuário por ID
   * @param id - ID do usuário
   * @returns O usuário encontrado
   * @throws NotFoundException se o usuário não for encontrado
   */
  private findUserById(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  /**
   * Busca o índice de um usuário por ID
   * @param id - ID do usuário
   * @returns O índice do usuário no array
   * @throws NotFoundException se o usuário não for encontrado
   */
  private findUserIndexById(id: number): number {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return userIndex;
  }

  /**
   * Aplica filtros na lista de usuários
   * @param filters - Filtros a serem aplicados
   * @returns Lista de usuários filtrada
   */
  private applyFilters(filters: QueryUserDto): User[] {
    let result = [...this.users];

    result = this.filterByName(result, filters.name);
    result = this.filterByAgeRange(result, filters.minAge, filters.maxAge);
    result = this.filterByCity(result, filters.city);
    result = this.filterByState(result, filters.state);

    return result;
  }

  /**
   * Aplica paginação na lista de usuários
   * @param users - Lista de usuários
   * @param page - Página atual
   * @param limit - Limite de itens por página
   * @returns Lista paginada de usuários
   */
  private applyPagination(users: User[], page: number, limit: number): User[] {
    const startIndex = (page - 1) * limit;
    return users.slice(startIndex, startIndex + limit);
  }

  /**
   * Filtra usuários por nome
   * @param users - Lista de usuários
   * @param name - Nome para filtrar (case-insensitive)
   * @returns Lista filtrada
   */
  private filterByName(users: User[], name?: string): User[] {
    if (!name) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Filtra usuários por faixa etária
   * @param users - Lista de usuários
   * @param minAge - Idade mínima
   * @param maxAge - Idade máxima
   * @returns Lista filtrada
   */
  private filterByAgeRange(users: User[], minAge?: number, maxAge?: number): User[] {
    let result = users;

    if (minAge !== undefined) {
      result = result.filter(user => user.age >= minAge);
    }

    if (maxAge !== undefined) {
      result = result.filter(user => user.age <= maxAge);
    }

    return result;
  }

  /**
   * Filtra usuários por cidade
   * @param users - Lista de usuários
   * @param city - Cidade para filtrar (case-insensitive)
   * @returns Lista filtrada
   */
  private filterByCity(users: User[], city?: string): User[] {
    if (!city) return users;
    
    return users.filter(user =>
      user.address.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  /**
   * Filtra usuários por estado
   * @param users - Lista de usuários
   * @param state - Estado para filtrar (case-insensitive)
   * @returns Lista filtrada
   */
  private filterByState(users: User[], state?: string): User[] {
    if (!state) return users;
    
    return users.filter(user =>
      user.address.state.toLowerCase().includes(state.toLowerCase())
    );
  }

  /**
   * Calcula a idade média dos usuários
   * @returns Idade média com precisão de 2 casas decimais
   */
  private calculateAverageAge(): number {
    const total = this.users.length;
    if (total === 0) return 0;

    const sum = this.users.reduce((acc, user) => acc + user.age, 0);
    const average = sum / total;
    
    return Math.round(average * UsersService.PRECISION_DECIMALS) / UsersService.PRECISION_DECIMALS;
  }
}
