import { Router } from 'express';
import ControllerFactoryTeams from '../controllerFactories/TeamFactory';

const teamRouter = Router();
const teamController = ControllerFactoryTeams.create();

teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.findByPk);

export default teamRouter;
