// import request from "supertest";
// import express, { Request, Response, RequestHandler} from "express";
// import { validatePassword } from "../";

// const app = express();
// app.use(express.json());

// const handler: RequestHandler = (req: Request, res: Response): void => { res.status(200).send("OK"); };
// app.post("/test-password", validatePassword, handler);

// describe("Middleware validatePassword", () => {
//   it("devrait renvoyer une erreur si le mot de passe est manquant", async () => {
//     const response = await request(app).post("/test-password").send({});
//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe("Le mot de passe est requis.");
//   });

//   it("devrait renvoyer une erreur si le mot de passe est invalide", async () => {
//     const response = await request(app).post("/test-password").send({ password: "short" });
//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe("Mot de passe invalide");
//   });

//   it("devrait passer au prochain middleware si le mot de passe est valide", async () => {
//     const response = await request(app).post("/test-password").send({ password: "Test123!" });
//     expect(response.status).toBe(200);
//     expect(response.text).toBe("OK");
//   });
// });
