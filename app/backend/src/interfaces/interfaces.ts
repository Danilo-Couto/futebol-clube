import * as jwt from 'jsonwebtoken';

export interface IsJoi {
  [x: string]: any;
  isJoi: boolean; statusCode: number; message: string;
}

export interface JwtConfig {
  expiresIn: jwt.SignOptions['expiresIn'];
  algorithm: jwt.Algorithm;
}

// USER
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
  findOne(user: { where: { email: string; }; }): any;
}

// LOGIN
export interface IloginService {
  login(email: string, password: string): Promise<any>
  validateLogin?(req: Request, res: Response): Promise<any>
}

export interface ILoginModel { // talves não precise deste, apenas passar esta assinatura para IUserModel
  findOne(user: { where: { email: string; }; }): any;
}

// TEAMS
export interface ITeam {
  id: number;
  teamName:string;
}
export interface ITeamModel {
  findAll():Promise<any[]>
  findByPk(id: number):Promise<ITeam>;
}

export interface ITeamService {
  findAll():Promise<ITeam[]>
  findByPk(id: any):Promise<ITeam>;
}

// MATCHES
export interface IMatch {
  homeTeam: number
  homeTeamGoals: number
  awayTeamGoals: number
  inProgress: boolean
}
// export interface IMatchModel {
//   findAll(model: {
//     include: { model: TeamModel; as: string;
//       attributes: { exclude: string[]; }; }[]; }):Promise<IMatch[]>;
// }

export interface IMatchService {
  findAll():Promise<IMatch[]>
}
