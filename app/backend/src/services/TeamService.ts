import { ITeamModel } from '../interfaces/interfaces';

export default class TeamService {
  constructor(private teamModel: ITeamModel) {}

  findAll = async () => this.teamModel.findAll();

  findByPk = async (id: number) => {
    const team = await this.teamModel.findByPk(id);
    return team;
  };
}
