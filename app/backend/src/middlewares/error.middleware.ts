import { NextFunction, Request, Response } from 'express';
import { IsJoi } from '../interfaces/interfaces';

export default function handleErrors(
  err: IsJoi,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if(err.isJoi) return res.status(400).json({ message: 'All fields must be filled' });
  if(err.status) return res.status(err.status).json({ message: err.message });
  
  console.error('erro:', err);  
  return res.status(500).json({
    message: `Internal server error: ${err.message}`,
  });
}
