import HttpError from '@/utils/HttpError';
import catchAsync from '@/utils/CatchAsync';
import { verifyJwt } from '@/utils/JWT';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';

export const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.split(' ')[1];
      const decoded = verifyJwt<{ user_id: string }>(accessToken);
      if (decoded?.user_id) res.locals.id = decoded.user_id;
      else throw new HttpError(httpStatus.UNAUTHORIZED, 'Invalid Token');
      next();
    } else {
      next(new HttpError(httpStatus.BAD_REQUEST, 'Access Token Not Provided'));
    }
  }
);
