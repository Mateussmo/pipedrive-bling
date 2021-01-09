import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

interface TokenPayload {
  id: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.SECRET as string);

    const { id } = decoded as TokenPayload;

    response.locals.id = id;

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
