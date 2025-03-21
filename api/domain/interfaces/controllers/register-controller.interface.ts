import { NextFunction, Request, Response } from "express";

export interface ControllerInterface {
  execute(req: Request, res: Response, next: NextFunction): Promise<void>;
}
