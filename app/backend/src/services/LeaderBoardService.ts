import { Op } from 'sequelize';
import MatchModel from '../database/models/MatchModel';
import TeamService from './TeamService';

export default class LeaderBoardService {
  constructor(
    private matchModel = MatchModel,
    private teamService = new TeamService(),
  ) { }

  // filtrado por finalizados
  findAllMatches = async () => this.matchModel.findAll({ where: {inProgress: false}});
  allTeams = () => this.teamService.findAll();

  matches = this.findAllMatches();
  teams = this.allTeams();

  totalGames = async (team: number) => await this.matchModel.count({ where: { 
      [Op.or]: [{ homeTeam: team }, { awayTeam: team}], inProgress: false}});

  goalsFavor = async (team: number) => 
    await this.matchModel.sum('home_team_goals' , { where: {homeTeam: team, inProgress: false} }) +
    await this.matchModel.sum('away_team_goals' , { where: {awayTeam: team, inProgress: false}})
  
  goalsOwn = async (team: number) => 
    await this.matchModel.sum('away_team_goals' , { where: {homeTeam: team, inProgress: false} }) +
    await this.matchModel.sum('home_team_goals' , { where: {awayTeam: team, inProgress: false}});

  goalsBalance = async (team: number) => await this.goalsFavor(team) - await this.goalsOwn(team);

  homeDataMatch = async (team: number) => { // como mandante
    const objMatch = { victories: 0, losses: 0, drawns: 0 };
    const matchesByTeamHome = (await this.matches).filter((match) => match.homeTeam === team); 
      
    matchesByTeamHome.map((match)=> {
      if(match.homeTeamGoals > match.awayTeamGoals) { objMatch.victories +=1 }
      else if (match.homeTeamGoals < match.awayTeamGoals) { objMatch.losses +=1 }
      else { objMatch.drawns +=1 }
      return objMatch;
    }).map((match)=> {
    const objMatch = { victories: 0, losses: 0, drawns: 0 };
      if (match.victories !== 0 ) { objMatch.victories +=1 }
      else if (match.losses !== 0 ) { objMatch.losses +=1 }
      else { objMatch.drawns +=1 }
      return objMatch
    })
    return objMatch;
  }

  awayDataMatch = async (team: number) => { // como visitante
    const objMatch = { victories: 0, losses: 0, drawns: 0 };

    const matchesByAwayHome = ((await this.matches)).filter((match) => match.awayTeam === team); 
      
    matchesByAwayHome.map((match)=> {
      if (match.homeTeamGoals < match.awayTeamGoals) { objMatch.victories +=1 }
      else if (match.homeTeamGoals > match.awayTeamGoals) { objMatch.losses +=1 }
      else { objMatch.drawns +=1 }
      return objMatch;
    }).map((match)=> {
    const objMatch = { victories: 0, losses: 0, drawns: 0 };
      if (match.victories !== 0 ) { objMatch.victories +=1 }
      else if (match.losses !== 0 ) { objMatch.losses +=1 }
      else { objMatch.drawns +=1 }
      return objMatch
    })
    return objMatch;
  }

  dataMatch = async (team: number) => {
    const homeData = await this.homeDataMatch(team);
    const awayData = await this.awayDataMatch(team);
    return {
      victories : homeData.victories + awayData.victories,
      losses : homeData.losses + awayData.losses,
      drawns : homeData.drawns + awayData.drawns,
    } 
  }
  
  totalPoints = async (team: number) => (await this.dataMatch(team)).victories * 3 + (await this.dataMatch(team)).drawns * 1;

  efficiency = async (team: number ) => (await this.totalPoints(team)/ (await this.totalGames(team)*3)*100).toFixed(2)

  leaderBoard = async () => {
    return Promise.all( 
      (await this.teams).map(async (team) => ({
        name: team.teamName,
        totalPoints: await this.totalPoints(team.id),
        totalGames: await this.totalGames(team.id),
        totalVictories: (await this.dataMatch(team.id)).victories,
        totalDraws: (await this.dataMatch(team.id)).drawns,
        totalLosses: (await this.dataMatch(team.id)).losses,
        goalsFavor: await this.goalsFavor(team.id),
        goalsOwn: await this.goalsOwn(team.id),
        goalsBalance: await this.goalsBalance(team.id),
        efficiency: await this.efficiency(team.id)
      }))
    );
  }; 
 }
