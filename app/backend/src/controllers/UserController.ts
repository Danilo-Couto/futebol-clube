import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  // static validateLogin: string | object;
  constructor(private userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.userService.login(email, password);
    return (result.error)
      ? res.status(401).json({ message: result.error })
      : res.status(200).json(result);
  };

  public validateLogin = (req: Request, res: Response) => {
    const { role } = req.body.userFound;

    return role
      ? res.status(200).json(role)
      : res.status(401).json({ message: 'Invalid token' });
  };

  get validaToken() { return this.validateLogin; }
}
