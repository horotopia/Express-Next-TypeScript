import { NextFunction, Request, Response } from 'express';
import { LoginUsecase } from '../../../../application';

/**
 * Login controller for Express
 */
export class LoginController {
  private loginUsecase: LoginUsecase;

  constructor() {
    this.loginUsecase = new LoginUsecase();
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Invalid email or password' });
      }
      const token = await this.loginUsecase.execute(email, password);
      if (!token) {
        res.status(204).json({ error: 'Invalid email or password' });
      }
      res.status(200).json({ token });
    } catch (error) {
      if (!res.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      }
      next(error);
    }
  }
}