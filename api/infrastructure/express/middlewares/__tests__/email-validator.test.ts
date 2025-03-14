// import request from "supertest";
// import express, { Request, Response, RequestHandler} from "express";
// import { validateEmail } from "../";

// const app = express();
// app.use(express.json());

// const handler: RequestHandler = (req: Request, res: Response): void => { res.status(200).send("OK"); };
// app.post("/test-email", validateEmail, handler);

// describe("Middleware validateEmail", () => {
//   it("devrait renvoyer une erreur si l'email est manquant", async () => {
//     const response = await request(app).post("/test-email").send({});
//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe("L'email est requis.");
//   });

//   it("devrait renvoyer une erreur si l'email est invalide", async () => {
//     const response = await request(app).post("/test-email").send({ email: "invalid-email" });
//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe("Email invalide");
//   });

//   it("devrait passer au prochain middleware si l'email est valide", async () => {
//     const response = await request(app).post("/test-email").send({ email: "test@example.com" });
//     expect(response.status).toBe(200);
//     expect(response.text).toBe("OK");
//   });
// });
