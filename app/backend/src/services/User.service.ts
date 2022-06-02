import * as bcryptjs from 'bcryptjs';
import { generatedToken } from '../utils/Token';
import { ILoginModel, IUser } from '../interfaces/interfaces';

const accessDenied = 'Incorrect email or password';

export default class UserService {
  constructor(private loginModel: ILoginModel) {
  }

  getUserByEmail = async (email: string): Promise<IUser> => {
    const userFound = await this.loginModel
      .findOne({ where: { email } });
    return userFound;
  };

  login = async (email: string, reqPass: string) => {
    const userFound = await this.getUserByEmail(email);
    if (!userFound) return accessDenied;

    const isValidPass = await bcryptjs.compare(reqPass, userFound.password);
    if (!isValidPass) return accessDenied;

    const { dataValues } = userFound;
    const token = generatedToken(dataValues);
    const { id, username, role } = dataValues;

    return { user: { id, username, role, email }, token };
  };
}
