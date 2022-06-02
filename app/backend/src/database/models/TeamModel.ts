import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Match from './MatchModel';

export default class TeamModel extends Model {
  id:number;
  teamName:string;
}

TeamModel.init({
  teamName: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

Match.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'home_team' }); // objeto é do obj pertencido
Match.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'away_team' });
