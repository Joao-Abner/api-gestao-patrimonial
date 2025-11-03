// Este arquivo define um decorator personalizado para atribuir funções (roles) aos manipuladores de rotas no NestJS.
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
