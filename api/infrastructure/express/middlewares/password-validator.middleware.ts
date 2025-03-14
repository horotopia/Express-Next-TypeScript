import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../../../domain";

export const validatePassword: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (!password) {
        res.status(400).json({ message: "Le mot de passe est requis." });
        return;
    }

    console.log(`User.isValidPassword: ${typeof User.isValidPassword}`);

    if (!User.isValidPassword(password)) {
        res.status(400).json({ error: "Mot de passe invalide" });
        return;
    }

    next();
};
