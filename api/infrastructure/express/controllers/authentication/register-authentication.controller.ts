import { NextFunction, Request, Response } from 'express';
import { RegisterUsecase } from '../../../../application';
import { ControllerInterface } from '../../../../domain';

/**
 * Register controller for Express
 */
export class RegisterController implements ControllerInterface {
  private registerUsecase;

  constructor() {
    this.registerUsecase = new RegisterUsecase();
  }

  public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Invalid email or password' });
      }
      const token = await this.registerUsecase.execute(email, password);
      if (!token) {
        res.status(204).json({ error: 'Invalid email or password' });
      }
      if (token instanceof Error) {
        res.json({ error: token.message });
      }
      res.status(201).json(token);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      }
      next(error);
    }
  }
}