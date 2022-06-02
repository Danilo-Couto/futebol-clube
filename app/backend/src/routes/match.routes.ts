import { Router } from 'express';
import ControllerFactoryTeams from '../controllerFactories/TeamFactory';

const matchRoutes = Router();
const matchController = ControllerFactoryTeams.create();

matchRoutes.get('/', matchController.findAll);

export default matchRoutes;
