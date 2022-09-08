import { NextFunction, Request, Response } from 'express';

const ERRORS = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400
};

export default function errorHandler(
  err,
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
