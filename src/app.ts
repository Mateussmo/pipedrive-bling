import './bootstrap';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes/index';
import AppError from './shared/errors/AppError';
import ValidationError from './shared/errors/ValidationError';

import './shared/database';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError || err instanceof ValidationError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    message: 'Internal server error',
  });
});

export default app;
