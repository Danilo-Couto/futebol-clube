import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { IUser, JwtConfig } from '../interfaces/interfaces';

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' }).trim();
const jwtConfig: JwtConfig = { expiresIn: '3d', algorithm: 'HS256' } as JwtConfig;

const generatedToken = (userFound: IUser) => {
  const { id, email, role } = userFound;
  const token = jwt.sign({ id, email, role }, secret, jwtConfig);
  return token;
};

const verifiedToken = (token: string) => jwt.verify(token, secret);

export { generatedToken, verifiedToken };
