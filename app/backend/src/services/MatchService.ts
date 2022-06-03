import { IMatch } from '../interfaces/interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  constructor(private matchModel = MatchModel) { }

  findAll = async () => {
    const matches = await this.matchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };

  create = async (body: IMatch) => {
    const match = await this.matchModel.create(body);
    return match;
  };
}
