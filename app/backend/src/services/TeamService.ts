import { ITeamModel } from '../interfaces/interfaces';

export default class TeamService {
  constructor(private teamModel: ITeamModel) {}

  findAll = async () => this.teamModel.findAll();

  findByPk = async (id: number) => this.teamModel.findByPk(id);
}
