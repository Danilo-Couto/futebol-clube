import * as express from 'express';
import * as cors from 'cors';
import loginRouter from './routes/login.routes';
import handleErrors from './middlewares/error.middleware';
import teamsRouter from './routes/team.routes';
import matchRoutes from './routes/match.routes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());

    // this.app.use('/test', (req, res) => { res.json('Hello world'); });
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/matches', matchRoutes);
    this.app.use(handleErrors);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
