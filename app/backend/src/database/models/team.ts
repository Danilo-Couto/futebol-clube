import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Match from './match';

class Team extends Model {
  id:number;
  teamName:string;
}

Team.init({
  teamName: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'home_team' }); // objeto é do obj pertencido
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'away_team' });

export default Team;
