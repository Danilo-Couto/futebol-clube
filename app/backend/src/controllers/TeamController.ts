import { Request, Response } from 'express';
import { ITeamService } from '../interfaces/interfaces';

export default class TeamController {
  constructor(private teamsService: ITeamService) { }

  public findAll = async (req: Request, res: Response) => {
    const teams = await this.teamsService.findAll();
    return (!teams)
      ? res.status(401).json({ message: 'Teams not found' })
      : res.status(200).json(teams);
  };

  public findByPk = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.findByPk(id);
    return (!team)
      ? res.status(401).json({ message: 'Team not found' })
      : res.status(200).json(team);
  };
}
