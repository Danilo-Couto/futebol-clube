import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import MatchModel from './MatchModel';

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

MatchModel.belongsTo(TeamModel, { foreignKey: 'home_team', as: 'teamHome' }); // objeto é do obj pertencido
MatchModel.belongsTo(TeamModel, { foreignKey: 'away_team', as: 'teamAway' });
