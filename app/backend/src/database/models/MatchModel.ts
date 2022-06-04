import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export default class MatchModel extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

MatchModel.init({
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
  },
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
  },
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});
