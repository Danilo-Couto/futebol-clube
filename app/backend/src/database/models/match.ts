import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class Match extends Model {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress = false;
}

Match.init({
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

export default Match;
