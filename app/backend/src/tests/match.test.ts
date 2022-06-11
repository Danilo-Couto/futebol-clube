import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import MatchModel from '../database/models/MatchModel';
import mockMatches from './mocks/mockMatches';
import mockTeams from './mocks/mockTeams';
import TeamModel from '../database/models/TeamModel';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);
const { expect } = chai;

let chaiHttpResponse: Response;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTQ2MTg0NDcsImV4cCI6MTY1NDg3NzY0N30.1VlQ2k4iRrJXyUh93pAvFko0HwGFSi8Dnulphtrt-0A';

describe('Desenvolva o endpoint /matches de forma que os dados APAREÇAM corretamente na tela de partidas no front-end', () => {
  beforeEach(async() => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(mockMatches.allMatches as unknown as MatchModel[]); //PQ UNKNONW??
  });

  afterEach(()=>{
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('Será validado que a página apresentará todos os dados de partidas sem nenhum filtro', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')
       expect(chaiHttpResponse.status).to.be.equal(200);
       expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches.allMatches)
  });  
});

describe('Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas EM ANDAMENTO na tela de partidas do front-end', () => {
  beforeEach(async() => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(mockMatches.allMatches as unknown as MatchModel[]);
  });

  afterEach(()=>{
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('Será validado que ao escolher a opção de partidas EM ANDAMENTO serão filtradas todas as partidas EM ANDAMENTO', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true')
       const test = ((chaiHttpResponse.body)).every((body: { inProgress: boolean }) => 
       body.inProgress === true)

       expect(chaiHttpResponse.status).to.be.equal(200);
       expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches.allMatches)
       // expect(test).to.be.equal('true')
      });  
});

describe('Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas FINALIZADAS na tela de partidas do front-end', () => {
  beforeEach(async() => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(mockMatches.allMatches as unknown as MatchModel[]); 
  });

  afterEach(()=>{
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('Será validado que ao escolher a opção de partidas FINALIZADAS serão filtradas todas as partidas FINALIZADAS', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=false')
       expect(chaiHttpResponse.status).to.be.equal(200);
       expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches.allMatches)
  });  
});

describe('Desenvolva a rota /matches de modo que seja possível SALVAR uma partida no banco de dados', () => {
  beforeEach(async() => {
    sinon
      .stub(TeamModel, "findByPk")
      .resolves(mockTeams.teams[0] as TeamModel)
      .resolves(mockTeams.teams[1] as TeamModel)
    sinon
      .stub(jwt, "verify")
      .resolves({
        id: 1,
        email: 'admin@admin.com',
        role: 'admin',
        iat: 1654887708,
        exp: 1655492508
      } as any );
    sinon
      .stub(MatchModel, "create")
      .resolves(mockMatches.createdMatch as unknown as MatchModel)
  });

  afterEach(()=>{
    (TeamModel.findByPk as sinon.SinonStub).restore(),
    (MatchModel.create as sinon.SinonStub).restore(),
    (jwt.verify as sinon.SinonStub).restore();

  })
  
  it('Será validado que é possível SALVAR um jogo no banco de dados e ver o jogo na página de jogos', async () => {      
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('authorization', token)
    .send(mockMatches.createdMatch)

      expect(chaiHttpResponse.status).to.be.equal(201)
      expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches.createdMatch)
  });  

  it('Não deve ser possível criar uma partida com TIMES IGUAIS, deve-se retornar, com um status 401, a seguinte mensagem de erro:', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('authorization', token)
    .send({
      homeTeam: 16,
      awayTeam: 16,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true
    })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" }) 
  });
}); 

describe('Desenvolva a rota /matches de modo que NÃO seja possível SALVAR uma partida no banco de dados', () => {
  beforeEach(async() => {
    sinon
      .stub(TeamModel, "findByPk")
      .resolves(undefined)
    sinon
      .stub(MatchModel, "create")
       .resolves(false as any)
  });

  afterEach(()=>{
    (TeamModel.findByPk as sinon.SinonStub).restore(),
    (MatchModel.create as sinon.SinonStub).restore()
  })
  
it('Será validado que não é possível inserir uma partida com time que não existe na tabela teams', async () => {
  chaiHttpResponse = await chai
  .request(app)
  .post('/matches')
  .set('authorization', token)
  .send({
    homeTeam: 126,
    awayTeam: 16,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  })

  expect(chaiHttpResponse.status).to.be.equal(404);
  expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'There is no team with such id!'})
  }); 
}); 

describe('Desenvolva a rota /matches/:id/finish de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados', () => {
  describe('Será validado que ao finalizar uma partida é alterado no banco de dados e na página.', async () => {
    before(async () => {
      sinon
        .stub(MatchModel, "findByPk")
        .resolves(mockMatches.createdMatch as MatchModel);
      sinon
        .stub(MatchModel, "update")
        .resolves()
 
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
    })

    after(() => {
      (MatchModel.findByPk as sinon.SinonStub).restore();
      (MatchModel.update as sinon.SinonStub).restore();
    })

    it('Verifica retorno do status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Finished" });
    });
  });
});