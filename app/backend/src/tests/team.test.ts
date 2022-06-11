import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel';
import mocksTeams from './mocks/mockTeams';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente', () => {

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(mocksTeams.teams as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })

  it('Deve ser uma rota GET com resposta com status 200 e com um json contendo o modelo esperado', async () => {  
    const teams = [ { id: 1, teamName: 'Avaí/Kindermann'},
    {id: 2, teamName: 'Bahia'},
    {id: 3, teamName: 'Botafogo'},
    {id: 4, teamName: 'Corinthians'},
    {id: 5, teamName: 'Cruzeiro'} ];
  
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams)
  });
});

describe('Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico', () => {

  before(async () => {
    sinon
      .stub(TeamModel, "findOne")
      .resolves({
        id: 5,
        teamName: 'Cruzeiro'
      } as TeamModel);
  });

  after(()=>{
    (TeamModel.findOne as sinon.SinonStub).restore();
  })

  it('Deve ser uma rota GET com resposta com status 200 e com um json contendo o retorno no seguinte modelo:', async () => {  
    const teams ={ id: 5, teamName: 'Cruzeiro'}
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/5')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams)
  });
});
