import { Request, Response } from 'express';
import { verifiedToken } from '../utils/Token';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public findAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.findAll();
    return (!matches)
      ? res.status(401).json({ message: 'Erro: Matches not found' })
      : res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const decoded = verifiedToken(token);
    if (!decoded) return res.status(400).json({ message: 'Not Authorized' });

    const match = await this.matchService.create(req.body);
    return !match
      ? res.status(401).json({ message: 'Erro: Match not created' })
      : res.status(201).json(match);
  };
}
