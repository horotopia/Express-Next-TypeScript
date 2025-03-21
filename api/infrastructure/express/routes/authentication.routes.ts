import express, { Router } from 'express';
import { 
  LoginController, 
  // LogoutAuthenticationController, 
  // RecoverForgottenPasswordAuthenticationController, 
  RegisterController 
} from '../controllers';
import { validatePassword, validateEmail } from '../middlewares';
import { ControllerInterface } from '@domain/interfaces/controllers';

export class AuthenticationRoutes {
  public router: Router;
  private loginController: LoginController;
  // private logoutController: LogoutAuthenticationController;
  // private recoverPasswordController: RecoverForgottenPasswordAuthenticationController;
  private registerController: ControllerInterface;

  constructor() {
    this.router = express.Router();
    this.loginController = new LoginController();
    // this.logoutController = new LogoutAuthenticationController();
    // this.recoverPasswordController = new RecoverForgottenPasswordAuthenticationController();
    this.registerController = new RegisterController();

    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.post('/login', validateEmail, validatePassword, this.loginController.execute);//.bind(this.loginController));
    // this.router.post('/logout', (req, res) => {this.logoutController.logout(req, res)});
    // this.router.post('/recover-password', (req, res) => {this.recoverPasswordController.recoverPassword(req, res)});
    this.router.post('/register', validateEmail, validatePassword, this.registerController.execute);//.bind(this.registerController));
  }
}