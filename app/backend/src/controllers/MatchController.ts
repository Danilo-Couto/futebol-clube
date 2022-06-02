import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public findAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.findAll();
    return (!matches)
      ? res.status(401).json({ message: 'Matches not found' })
      : res.status(200).json(matches);
  };
}
