import { Identifier } from 'sequelize/types';
import { IMatch } from '../interfaces/interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  constructor(private matchModel = MatchModel) { }

  findAll = async () =>
    this.matchModel.findAll({
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
    })
  ;

  create = async (body: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = body;
    const match = { message: '', matchCreated: {} };

    if (homeTeam === awayTeam) {
      match.message = 'It is not possible to create a match with two equal teams';
    }
    const matchCreated = await this.matchModel.create({homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress}, { raw: true });
    match.matchCreated = matchCreated;
    return match;
  };

  findByPk = async (id: Identifier | undefined) => this.matchModel.findByPk(id, { raw: true });

  finishMatch = async (id: Identifier | undefined) => {
    const updatedMatch = await this.matchModel.update({ inProgress: false }, { where: { id } });
    return updatedMatch;
  };

  updateScore = async (id: Identifier | undefined, homeTeamGoals: number, awayTeamGoals: number) => {    
    const updatedMatch = await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updatedMatch;
  };
}
