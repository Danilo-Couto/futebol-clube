import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModel';
import { Response } from 'superagent';
import MatchController from '../controllers/MatchController';
import MatchModel from '../database/models/MatchModel';
import MatchService from '../services/MatchService';
import UserController from '../controllers/UserController';
import UserModel from '../database/models/UserModel';
import { request } from 'http';
chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

// describe('', () => {
  // Exemplo do uso de stubs com tipos 
  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });

describe('Desenvolva o endpoint /login no back-end de maneira ele permita o acesso com dados válidos no front-end', () => {

  before(async() => {
    sinon
    .stub(User, "findOne")
    .resolves({
      id: 1,
      username: 'admin_user',
      role: 'admin',
      email: 'admin@gmail.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

it('É possível encontrar o usuário por email e fazer login', async () => {
  chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
        password: 'secret_admin',
    })
  expect(chaiHttpResponse.status).to.be.equal(200);
  expect(chaiHttpResponse.body).to.have.property('user')
  expect(chaiHttpResponse.body).to.have.property('token')
  expect(chaiHttpResponse.body.user).to.have.haveOwnProperty ('id')
  expect(chaiHttpResponse.body.user).to.not.have.property('password')
});
});

describe('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email ou password inválido no front-end', () => {     
  beforeEach(async() => {
    sinon
    .stub(User, "findOne")
    .resolves(false as any);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Não é possível logar com email inválido', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
        email: 'erroougmail.com',
        password: 'secret_admin',
      })
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  }); // PQ NAO ESTA PASSANDO?

  it('Não é possível logar com password inválido', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
        email: 'admin@gmail.com',
        password: 'senha_errada',
      })
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  });
});

describe('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email ou password', () => { 
  it('Não é possível encontrar o usuário por faltar email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
          password: 'secret_admin',
      })
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });

  it('Não é possível encontrar o usuário por faltar password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
      })
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });    
}); 

describe('O avaliador verificará se tentar bater na rota com um token válido, o mesmo retornará o tipo de usuário.', () => { 
    it('A resposta deve ser de status 200 com uma string contendo a role do user:', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTQ2MTg0NDcsImV4cCI6MTY1NDg3NzY0N30.1VlQ2k4iRrJXyUh93pAvFko0HwGFSi8Dnulphtrt-0A')
     
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal('admin')
  });
});   
