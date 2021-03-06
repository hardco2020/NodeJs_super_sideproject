import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { TodoRoute } from './main/api/todo/todo.routing';
import { LocalAuthRoute}  from './main/auth/local/local-auth.routing';
import { AppRoute } from './app.routing';
import { ErrorRequestHandler } from 'express';
import { Database } from './database';
import passport from 'passport';
import JWTGuard from 'express-jwt';

export class App {

  private app = express();

  constructor() {
    this.setPassport();
    this.setEnvironment();
    this.setHelmet();
    this.setCors();
    this.registerRoute();
  }

  // ====================================================================
  // @Public Methods
  // ====================================================================

  public bootstrap(): void {
    this.app.listen(process.env.PORT, () => console.log(`API Server is running at port ${ process.env.PORT }.`));
  }

  // ====================================================================
  // @Private Methods
  // ====================================================================
  private setPassport(): void {
    passport.initialize();
  }

  private setHelmet(): void {
    this.app.use(helmet());
  }

  private setCors(): void {
    this.app.use(cors());
  }

  private setEnvironment(): void {
    dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });
  }
  //處理錯誤
  public setException(handler: ErrorRequestHandler): void {
    this.app.use(handler);
  }
  public launchDatabase(): void {
    const database = new Database();
    database.connect();
  }
  private todoroute = new TodoRoute();
  private localauthroute = new LocalAuthRoute();
  private route!: AppRoute;
  private registerRoute(): void {;
    this.route = new AppRoute()
    this.app.use('/', this.route.router);
    //this.app.use('/todos', this.todoroute.router);
    //this.app.use('/localauth',this.localauthroute.router);
  }

}