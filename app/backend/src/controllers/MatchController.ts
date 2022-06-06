import { Request, Response } from 'express';
import { verifiedToken } from '../utils/Token';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

const noTeam = 'There is no team with such id!';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public findAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.findAll();
    return (!matches)
      ? res.status(401).json({ message: 'Erro: Matches not found' })
      : res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam } = req.body;

    const arrayTeams = await Promise.all([homeTeam, awayTeam].map(async (team) =>
      new TeamService().findByPk(team)));
    if (arrayTeams.some((team) => team === null)) {
      return res.status(404).json({ message: noTeam });
    }

    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const decoded = verifiedToken(token);
    if (!decoded) return res.status(400).json({ message: 'Not Authorized' });

    const matchCreated = await this.matchService.create(req.body);
    return matchCreated.message
      ? res.status(401).json({ message: matchCreated.message })
      : res.status(201).json(matchCreated.matchCreated);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMatch = await this.matchService.update(Number(id));

    return !updatedMatch
      ? res.status(401).json({ message: noTeam })
      : res.status(200).json({ message: 'Finished' });
  };

  public updateByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this.matchService
      .updateById(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    return !updatedMatch
      ? res.status(401).json({ message: 'Erro!' })
      : res.status(200).json({ message: 'Match Updated' });
  };
}
