import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) { }

  public getLeaderBoard = async (req: Request, res: Response) => {
    const leaderBoard = (await this.leaderBoardService.leaderBoard()).sort((a,b)=> (b.totalPoints - a.totalPoints || a.totalVictories - a.totalVictories || a.goalsBalance - a.goalsBalance || a.goalsFavor - a.goalsFavor || a.goalsOwn - a.goalsOwn )  )

    return (!leaderBoard)
      ? res.status(401).json({ message: 'Erro: leaderBoard not found' })
      : res.status(200).json(leaderBoard);
  };
}
