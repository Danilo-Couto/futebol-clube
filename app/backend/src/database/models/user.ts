import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});
