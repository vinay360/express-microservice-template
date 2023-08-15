import express from 'express';
import router from '@/routes';
import { errorConverter, errorHandler } from '@middlewares/error';
import HttpError from './utils/HttpError';
import httpStatus from 'http-status-codes';
import cors from 'cors';

const app = express();

app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/api/v1', router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new HttpError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
