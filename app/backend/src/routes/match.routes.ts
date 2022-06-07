import { Router } from 'express';
import { isTeamsExists, isTokenExists } from '../middlewares/validations.middleware';
import MatchController from '../controllers/MatchController';

const matchRoutes = Router();

const matchController = new MatchController();

matchRoutes.patch('/:id/finish', matchController.finishMatch);
matchRoutes.patch('/:id', matchController.updateScore);
matchRoutes.get('/', matchController.findAll);
matchRoutes.post('/', isTeamsExists, isTokenExists, matchController.create);

export default matchRoutes;
