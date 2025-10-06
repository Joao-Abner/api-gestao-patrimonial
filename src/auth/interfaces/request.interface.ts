import { Request } from 'express';

export interface AuthRequest extends Request {
  headers: {
    authorization?: string;
  };
}
