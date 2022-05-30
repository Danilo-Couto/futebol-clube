import { DataTypes, Model } from 'sequelize';
import db from '.';

class users extends Model {
  username: string;
  role: string;
  email: string;
  password: string;
}

users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  timestamps: false,
});

export default users;
