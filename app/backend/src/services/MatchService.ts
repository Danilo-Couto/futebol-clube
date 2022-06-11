import { Identifier } from 'sequelize/types';
import { IMatch } from '../interfaces/interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  constructor(private matchModel = MatchModel) { }

  allMatches = async () =>{
    return this.matchModel.findAll({
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
  };

  findByQuery = async (inProgress: boolean | undefined) => {  
    if (!inProgress) return this.allMatches();

    return await this.matchModel.findAll({
      where: { inProgress },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        }, {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        }],
    }); 
  }
;


create = async (body: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = body;
    if (homeTeam === awayTeam) return { error: 'It is not possible to create a match with two equal teams'}
    
    return { matchCreated:
      await this.matchModel.create({homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress}, { raw: true })
    }
  };

  findByPk = async (id: Identifier | undefined) => this.matchModel.findByPk(id, { raw: true });

  finishMatch = async (id: Identifier | undefined) => {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    return this.findByPk(id);
  }

  updateScore = async (id: Identifier | undefined, homeTeamGoals: number, awayTeamGoals: number) => {
    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return this.findByPk(id);
  }
}
