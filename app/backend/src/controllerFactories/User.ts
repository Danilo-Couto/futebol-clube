import UserService from '../services/User.service';
import UserController from '../controllers/User.controller';
import UserModel from '../database/models/UserModel';

export default class ControllerFactoryUser {
  public static create() {
    const userService = new UserService(UserModel);
    const userController = new UserController(userService);
    return userController;
  }
}
