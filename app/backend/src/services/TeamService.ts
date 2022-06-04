import { Identifier } from 'sequelize/types';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  constructor(private teamModel = TeamModel) {}

  findAll = async () => this.teamModel.findAll();

  findByPk = async (id: Identifier | undefined) => this.teamModel.findByPk(id, { raw: true });
}
