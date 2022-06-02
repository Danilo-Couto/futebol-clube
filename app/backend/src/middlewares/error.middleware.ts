import { NextFunction, Request, Response } from 'express';
import { IsJoi } from '../interfaces/interfaces';

export default function errorMidleware(
  err: IsJoi,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.isJoi) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  console.error('erro:', err);

  return res.status(500).json({
    message: `Internal server error: ${err.message}`,
  });
}
