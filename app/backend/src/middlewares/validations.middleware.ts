import { NextFunction, Request, Response } from 'express';
import * as JOI from 'joi';
import TeamService from '../services/TeamService';
import { verifiedToken } from '../utils/Token';

const noTeam = 'There is no team with such id!';

const loginScheme = JOI.object({
  email: JOI.string().required(),
  password: JOI.string().min(6).required(),
});

export const isLoginValid = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginScheme.validate({ email, password });
  if (error) return next({ status: 400, message: 'All fields must be filled' });
  next();
};

export const isTokenExists = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return next({ status: 401, message: 'Token not found' });

  const decoded = verifiedToken(token);
  if (!decoded) return next({ status: 401, message: 'Not Authorized' });

  req.body.userFound = decoded;
  return next();
}
export const isTeamsExists = async (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const arrayTeams = await Promise.all([homeTeam, awayTeam].map(async (team) => new TeamService().findByPk(team)));

  if (arrayTeams.some((team) => team === null)) return next({ status: 404, message: noTeam });
  return next();
}

export default { isLoginValid, isTokenExists, isTeamsExists };
