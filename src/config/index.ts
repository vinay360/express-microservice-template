import { config } from 'dotenv';
import * as process from 'process';
import { object, string } from 'zod';

config({
  path: `.env.${process.env.NODE_ENV?.toString().slice(0, 3) || 'dev'}`,
});

const envVariableSchema = object({
  NODE_ENV: string({ required_error: 'NODE_ENV is required' }).nonempty(),
  PORT: string({ required_error: 'PORT is required' }).nonempty(),
  ADDRESS: string().default('0.0.0.0'),
  MONGODB_URI: string({ required_error: 'MONGODB_URI is required' }),
  ACCESS_TOKEN_SECRET: string({
    required_error: 'ACCESS_TOKEN_SECRET is required',
  }),
});

export const { NODE_ENV, ADDRESS, PORT, MONGODB_URI, ACCESS_TOKEN_SECRET } =
  envVariableSchema.parse(process.env);
