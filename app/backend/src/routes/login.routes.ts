import { Router } from 'express';
import UserController from '../controllers/UserController';
import { isLoginValid, isTokenExists } from '../middlewares/validations.middleware';

const loginRouter = Router();
const userController = new UserController();

loginRouter.post('/', isLoginValid, userController.login);
loginRouter.get('/validate', isTokenExists, userController.validateLogin);

export default loginRouter;
