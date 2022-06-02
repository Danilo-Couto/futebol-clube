import TeamsService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
import TeamModel from '../database/models/TeamModel';

export default class ControllerFactoryTeam {
  public static create() {
    const teamService = new TeamsService(TeamModel);
    const teamController = new TeamController(teamService);
    return teamController;
  }
}
