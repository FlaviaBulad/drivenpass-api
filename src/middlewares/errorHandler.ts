import { NextFunction, Request, Response } from 'express';

const ERRORS = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  unprocessable_entity: 422
};

export default function errorHandler(
  err: { type: string; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const { type } = err;
  let statusCode = ERRORS[type];
  if (!statusCode) statusCode = 500; // any other types

  return res.sendStatus(statusCode); // internal server error
}
