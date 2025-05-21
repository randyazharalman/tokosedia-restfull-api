import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../error/response-error';

export const  errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    // res.status(400).json({
    //   errors: `Validation error : ${JSON.stringify(error)}`
    // })
    // Format Zod validation errors
    const formatted = error.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));

     res.status(400).json({
      status: 'error',
      type: 'validation',
      message: 'Validation failed',
      errors: JSON.stringify(formatted)
    });
  } else if (error instanceof ResponseError){
     res.status(error.statusCode).json({
      errors: error.message
    })
  } else {
      res.status(500).json({
        status: 'error',
        type: 'internal',
        message: 'Internal server error'
      });
  }
}
