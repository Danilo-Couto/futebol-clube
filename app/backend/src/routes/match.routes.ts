import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get('/', matchController.findAll);

export default matchRoutes;
