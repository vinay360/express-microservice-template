import { ACCESS_TOKEN_SECRET } from '@/config';
import jwt from 'jsonwebtoken';
import HttpError from './HttpError';
import { StatusCodes } from 'http-status-codes';

export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ['HS256'],
    }) as T;
  } catch (err: any) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, err);
  }
}
