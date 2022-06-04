import { Identifier } from 'sequelize/types';
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
    const { homeTeam, awayTeam } = body;
    const match = { message: '', matchCreated: {} };

    if (homeTeam === awayTeam) {
      match.message = 'It is not possible to create a match with two equal teams';
    }
    const matchCreated = await this.matchModel.create(body, { raw: true });
    match.matchCreated = matchCreated;
    return match;
  };

  findByPk = async (id: Identifier | undefined) => this.matchModel.findByPk(id, { raw: true });

  update = async (id: Identifier | undefined) => {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    const updatedMatch = await this.matchModel.findByPk(id, { raw: true });
    return updatedMatch;
  };
}
