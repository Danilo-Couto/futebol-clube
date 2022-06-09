class mockMatch {
  public allMatches = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: 'São Paulo'
      },
      teamAway: {
        teamName: 'Grêmio'
      }
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: 'São Paulo'
      },
      teamAway: {
        teamName: 'Internacional'
      }
    }
  ]

  public filteredMatches = [
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      }
    },
    {
      id: 42,
      homeTeam: 6,
      homeTeamGoals: 1,
      awayTeam: 1,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "Ferroviária"
      },
      teamAway: {
        teamName: "Avaí/Kindermann"
      }
    }
  ]

  
  public createdMatch = {
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 2,
      awayTeamGoals: 2,
      inProgress: true,
    }

  public createdMatchFalse = {
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 2,
    inProgress: false,
  }
}
 
export default new mockMatch();

  