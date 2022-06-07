import { Request, Response, NextFunction } from 'express';
import { verifiedToken } from '../utils/Token';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public findAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.findAll();
    return (!matches)
      ? res.status(401).json({ message: 'Erro: Matches not found' })
      : res.status(200).json(matches);
  };
  
  public findByPk = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchService.findByPk(id);
    return (!match)
      ? res.status(401).json({ message: 'Match not found' })
      : res.status(200).json(match);
  };

  public create = async (req: Request, res: Response) => {
    const matchCreated = await this.matchService.create(req.body);
    return matchCreated.message
      ? res.status(401).json({ message: matchCreated.message })
      : res.status(201).json(matchCreated.matchCreated);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMatch = await this.matchService.finishMatch(Number(id));
    console.log(updatedMatch);

    return !updatedMatch
      ? res.status(401).json({ message: 'Erro ao finalizar partida' })
      : res.status(200).json({ message: 'Finished' });
  };

  public updateScore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this.matchService
      .updateScore(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
      console.log(updatedMatch);

    return !updatedMatch
      ? res.status(401).json({ message: 'Erro ao atualizar placar da partida' })
      : res.status(200).json({ message: updatedMatch });
  };
}

