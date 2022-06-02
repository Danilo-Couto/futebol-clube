import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class UserModel extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

UserModel.init({
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
