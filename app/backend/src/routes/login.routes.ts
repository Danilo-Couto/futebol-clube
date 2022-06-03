import { Router } from 'express';
import UserController from '../controllers/User.controller';
import { loginJoi } from '../middlewares/validalogin.middleware';

const loginRouter = Router();
const userController = new UserController();

loginRouter.post('/', loginJoi, userController.login);
loginRouter.get('/validate', userController.validateLogin);

export default loginRouter;
