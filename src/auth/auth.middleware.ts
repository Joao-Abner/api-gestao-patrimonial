import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthRequest } from './interfaces/request.interface';
import { Response } from 'express'; // Importa o tipo Response do Express para lidar com respostas HTTP

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthRequest, res: Response, next: () => void) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
    next();
  }
}
