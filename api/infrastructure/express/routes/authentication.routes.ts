import express, { Router } from 'express';
import { 
  LoginController, 
  // LogoutAuthenticationController, 
  // RecoverForgottenPasswordAuthenticationController, 
  RegisterController 
} from '../controllers';
import { validatePassword, validateEmail } from '../middlewares';
console.log('AuthenticationRoutes import controllers');

export class AuthenticationRoutes {
  public router: Router;
  private loginController: LoginController;
  // private logoutController: LogoutAuthenticationController;
  // private recoverPasswordController: RecoverForgottenPasswordAuthenticationController;
  private registerController: RegisterController;

  constructor() {
    this.router = express.Router();
    this.loginController = new LoginController();
    // this.logoutController = new LogoutAuthenticationController();
    // this.recoverPasswordController = new RecoverForgottenPasswordAuthenticationController();
    this.registerController = new RegisterController();

    console.log('AuthenticationRoutes constructor');
    console.log(`password-validator: ${typeof validatePassword}`);
    console.log(`email-validator: ${typeof validateEmail}`);

    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log(`Initializing routes with validateEmail: ${typeof validateEmail}, validatePassword: ${typeof validatePassword}`);
    console.log(`LoginController execute method: ${typeof this.loginController.execute}`);
    console.log(`RegisterController execute method: ${typeof this.registerController.execute}`);

    this.router.post('/login', validateEmail, validatePassword, this.loginController.execute);//.bind(this.loginController));
    // this.router.post('/logout', (req, res) => {this.logoutController.logout(req, res)});
    // this.router.post('/recover-password', (req, res) => {this.recoverPasswordController.recoverPassword(req, res)});
    this.router.post('/register', validateEmail, validatePassword, this.registerController.execute);//.bind(this.registerController));
  }
}