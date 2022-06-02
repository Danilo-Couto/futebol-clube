import * as jwt from 'jsonwebtoken';

export interface IsJoi {
  [x: string]: any;
  isJoi: boolean; statusCode: number; message: string;
}

export interface JwtConfig {
  expiresIn: jwt.SignOptions['expiresIn'];
  algorithm: jwt.Algorithm;
}

export interface IUser {
  dataValues?: any;
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserModel {
  getByName(user: IUser): Promise<IUser>
  findAll(): Promise<IUser[]>
  getAll():Promise<IUser[]>
  create(user: IUser): Promise<IUser>
}

export interface IloginService {
  login(email: string, password: string): Promise<any>
  validateLogin?(req: Request, res: Response): Promise<any>
}

export interface ILoginModel {
  findOne(user: { where: { email: string; }; }): any;
}
