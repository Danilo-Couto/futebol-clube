import { NextFunction, Request, Response } from 'express';
import * as JOI from 'joi';

const loginScheme = JOI.object({
  email: JOI.string().required(),
  password: JOI.string().min(6).required(),
});

export const loginJoi = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginScheme.validate({ email, password });
  if (error) throw error;
  next();
};

export default { loginJoi };
