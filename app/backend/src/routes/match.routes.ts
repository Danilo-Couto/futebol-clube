import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get('/', matchController.findAll);
matchRoutes.post('/', matchController.create);
matchRoutes.patch('/:id/finish', matchController.update);

export default matchRoutes;
