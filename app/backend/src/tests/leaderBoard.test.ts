import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import MatchModel from '../database/models/MatchModel';
import mockMatches from './mocks/mockMatches';
import mockLeaderBoard from './mocks/mockLeaderBoard';
import TeamModel from '../database/models/TeamModel';
import mockTeams from './mocks/mockTeams';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação dos times na tela de classificação', () => {
  beforeEach(async() => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(mockMatches.allMatches as unknown as MatchModel[]);
    sinon
      .stub(TeamModel, "findAll")
      .resolves(mockTeams.teams as unknown as MatchModel[]);

    sinon
      .stub(MatchModel, "count")
      .resolves(2);
    sinon
     .stub(MatchModel, "sum")
     .resolves(1);
  });

  afterEach(()=>{
    (MatchModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findAll as sinon.SinonStub).restore();
    (MatchModel.count as sinon.SinonStub).restore();
    (MatchModel.sum as sinon.SinonStub).restore();
  })

  it('Retorna classificação GERAL', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard')

       expect(chaiHttpResponse.status).to.be.equal(200);
       expect(chaiHttpResponse.body).to.be.deep.equal(mockLeaderBoard.teams)
  });  

  it('Retorna classificação dos TIMES DA CASA', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')

       expect(chaiHttpResponse.status).to.be.equal(200);
       expect(chaiHttpResponse.body).to.be.deep.equal(mockLeaderBoard.homeTeams)
  });

  it('Retorna classificação dos TIMES DA CASA', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away')

       expect(chaiHttpResponse.status).to.be.equal(200);
       expect(chaiHttpResponse.body).to.be.deep.equal(mockLeaderBoard.awayTeams)
  });
});

  