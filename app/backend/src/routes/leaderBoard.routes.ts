import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRoutes = Router();

const leaderBoardController = new LeaderBoardController();

leaderBoardRoutes.get('/', leaderBoardController.getLeaderBoard);

export default leaderBoardRoutes;
