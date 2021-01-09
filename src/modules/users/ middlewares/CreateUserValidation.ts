import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import ValidationError from '../../../shared/errors/ValidationError';

export default async function CreateUserValidation(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const schema = yup.object().shape({
      username: yup.string().required().strict(true),
      password: yup.string().required().strict(true),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    throw new ValidationError(err.errors, 422);
  }
}
