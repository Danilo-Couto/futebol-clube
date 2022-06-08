import MatchModel from '../database/models/MatchModel';
import TeamService from './TeamService';

export default class LeaderBoardServiceHome {
  constructor(
    private matchModel = MatchModel,
    private teamService = new TeamService(),
  ) { }

  // filtrado por finalizados
  findAllMatches = async () => this.matchModel.findAll({ where: {inProgress: false}});
  allTeams = () => this.teamService.findAll();

  totalGames = async (team: number) => await this.matchModel.count({ where: { homeTeam: team , inProgress: false }});

  goalsFavor = async (team: number) => 
    await this.matchModel.sum('home_team_goals', { where: {homeTeam: team, inProgress: false} })
      
  goalsOwn = async (team: number) => 
    await this.matchModel.sum('away_team_goals', { where: {homeTeam: team, inProgress: false} })

  goalsBalance = async (team: number) => await this.goalsFavor(team) - await this.goalsOwn(team);

  homeDataMatch = async (team: number) => { // como mandante
    const matchesByTeamHome = (await this.findAllMatches()).filter((match) => match.homeTeam === team);
    return matchesByTeamHome.reduce((acc, curr) => {
      if(curr.homeTeamGoals > curr.awayTeamGoals) { acc.victories +=1 }
      else if (curr.homeTeamGoals < curr.awayTeamGoals) { acc.losses +=1 }
      else { acc.drawns +=1 }
      return acc;
    }, { victories: 0, losses: 0, drawns: 0 })
  }

  totalPoints = async (team: number) => (await this.homeDataMatch(team)).victories * 3 + (await this.homeDataMatch(team)).drawns;

  efficiency = async (team: number ) => +(await this.totalPoints(team)/ (await this.totalGames(team)*3)*100).toFixed(2)
  leaderBoardHome = async () => {
    return (await Promise.all(
      (await this.allTeams()).map(async (team) => ({
        name: team.teamName,
        totalPoints: await this.totalPoints(team.id),
        totalGames: await this.totalGames(team.id),
        totalVictories: (await this.homeDataMatch(team.id)).victories,
        totalDraws: (await this.homeDataMatch(team.id)).drawns,
        totalLosses: (await this.homeDataMatch(team.id)).losses,
        goalsFavor: await this.goalsFavor(team.id),
        goalsOwn: await this.goalsOwn(team.id),
        goalsBalance: await this.goalsBalance(team.id),
        efficiency: await this.efficiency(team.id)
      }))
    )).sort((a,b) => (b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn));
  }; 
 }
