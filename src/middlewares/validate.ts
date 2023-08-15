import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            const data = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        };

export default validate;
