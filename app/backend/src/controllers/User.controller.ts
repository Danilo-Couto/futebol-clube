import { Request, Response } from 'express';
import { verifiedToken } from '../utils/Token';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.userService.login(email, password);

    return (typeof result === 'string')
      ? res.status(401).json({ message: result })
      : res.status(200).json(result);
  };

  public validateLogin = (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const decoded = verifiedToken(token);
    req.body.userFound = decoded;
    const { role } = req.body.userFound;
    return role
      ? res.status(200).json(role)
      : res.status(401).json({ message: 'Invalid token' });
  };
}
