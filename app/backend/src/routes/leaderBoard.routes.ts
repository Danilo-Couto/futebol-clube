import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRoutes = Router();

const leaderBoardController = new LeaderBoardController();

leaderBoardRoutes.get('/', leaderBoardController.getLeaderBoard);
leaderBoardRoutes.get('/home', leaderBoardController.getLeaderBoardHomeTeam);
leaderBoardRoutes.get('/away', leaderBoardController.getLeaderBoardAwayTeam);

export default leaderBoardRoutes;
