import { Router } from 'express';
import ControllerFactoryUser from '../controllerFactories/User';
import { loginJoi } from '../middlewares/validalogin.middleware';

const loginRouter = Router();
const userController = ControllerFactoryUser.create();

loginRouter.post('/', loginJoi, userController.login);
loginRouter.get('/validate', userController.validateLogin);

export default loginRouter;
