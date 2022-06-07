import * as bcryptjs from 'bcryptjs';
import { generatedToken } from '../utils/Token';
import UserModel from '../database/models/UserModel';

const accessDenied = 'Incorrect email or password';

export default class UserService {
  constructor(private userModel = UserModel) {
  }

  getUserByEmail = async (email: string) => {
    const userFound = await this.userModel
      .findOne({ where: { email } });
    return userFound;
  };

  login = async (email: string, reqPass: string) => {
    const userFound = await this.getUserByEmail(email);
    if (!userFound) return accessDenied;

    const isValidPass = await bcryptjs.compare(reqPass, userFound.password);
    if (!isValidPass) return accessDenied;
    
    const token = generatedToken(userFound);
    const { id, username, role } = userFound;

    return { user: { id, username, role, email }, token };
  };
}
