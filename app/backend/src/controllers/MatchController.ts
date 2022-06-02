/* import { Request, Response } from 'express';

export default class MatchController {
  constructor(private teamsService: ITeamService) { }

  public findAll = async (req: Request, res: Response) => {
    const teams = await this.teamsService.findAll();
    return (!teams)
      ? res.status(401).json({ message: 'Teams not found' })
      : res.status(200).json(teams);
  };
}

 */
