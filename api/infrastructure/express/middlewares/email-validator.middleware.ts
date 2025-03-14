import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../../../domain";

export const validateEmail: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "L'email est requis." });
        return;
    }

    console.log(`User.isValidEmail: ${typeof User.isValidEmail}`);

    if (!User.isValidEmail(email)) {
        res.status(400).json({ error: "Email invalide" });
        return;
      }

    next();
};
