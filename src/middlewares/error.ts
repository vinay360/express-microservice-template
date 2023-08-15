import HttpError from "@utils/HttpError";
import {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";
import {fromZodError} from "zod-validation-error";
import * as mongoose from "mongoose";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {NODE_ENV} from "@config";
import logger from "@utils/logger";

const errorConverter = (
    err: HttpError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err;

    if (error instanceof ZodError) {
        const statusCode = StatusCodes.BAD_REQUEST;
        const message = fromZodError(error).message;
        error = new HttpError(statusCode, message, false, err.stack);
    } else if (!(error instanceof HttpError)) {
        const statusCode =
            error instanceof mongoose.Error
                ? StatusCodes.BAD_REQUEST
                : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || getReasonPhrase(statusCode);
        error = new HttpError(statusCode, message, false, err.stack);
    }

    next(error);
};

const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let {statusCode, message} = err;

    if (NODE_ENV === 'production' && !err.isOperational) {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = getReasonPhrase(statusCode);
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(NODE_ENV === 'development' && {stack: err.stack}),
    };

    if (NODE_ENV === 'development') {
        logger.error(
            `[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message}`
        );
    }

    res.status(statusCode).send(response);
};

export {errorConverter, errorHandler};