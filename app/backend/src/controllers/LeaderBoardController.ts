import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardServiceHome from '../services/LeaderBoardServiceHome';
import LeaderBoardServiceAway from '../services/LeaderBoardServiceAway';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
    private leaderBoardServiceHome = new LeaderBoardServiceHome(),
    private leaderBoardServiceAway = new LeaderBoardServiceAway(),
  ) { }

  public getLeaderBoard = async (req: Request, res: Response) => {
    const leaderBoard = (await this.leaderBoardService.leaderBoard());

    return (!leaderBoard)
      ? res.status(401).json({ message: 'Erro: leaderBoard not found' })
      : res.status(200).json(leaderBoard);
  };

  public getLeaderBoardHomeTeam = async (req: Request, res: Response) => {
    const leaderBoardHome = (await this.leaderBoardServiceHome.leaderBoardHome());
    return (!leaderBoardHome)
      ? res.status(401).json({ message: 'Erro: leaderBoardHomeTeam not found' })
      : res.status(200).json(leaderBoardHome);
  };
  
  public getLeaderBoardAwayTeam = async (req: Request, res: Response) => {
    const leaderBoardHomeAway = await this.leaderBoardServiceAway.leaderBoardAway();
    return (!leaderBoardHomeAway)
      ? res.status(401).json({ message: 'Erro: leaderBoardHomeAwayTeam not found' })
      : res.status(200).json(leaderBoardHomeAway);
  };
}
