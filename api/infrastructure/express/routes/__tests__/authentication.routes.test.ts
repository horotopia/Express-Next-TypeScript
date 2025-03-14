// import request from 'supertest';
// import express from 'express';
// import { AuthenticationRoutes } from '../authentication.routes';
// import { LoginController, RegisterController } from '../../controllers';
// import { validateEmail, validatePassword } from '../../middlewares';

// jest.mock('../../controllers/authentication/login-authentication.controller');
// jest.mock('../../controllers/authentication/register-authentication.controller');
// jest.mock('../../middlewares/email-validator.middleware');
// jest.mock('../../middlewares/password-validator.middleware');

// const app = express();
// app.use(express.json());
// const authRoutes = new AuthenticationRoutes();
// app.use('/auth', authRoutes.router);

// describe('Authentication Routes', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('POST /auth/login', () => {
//     it('should call validateEmail, validatePassword and LoginController.execute', async () => {
//       const mockExecute = jest.fn().mockImplementation((req, res) => res.status(200).send());
//       (LoginController.prototype.execute as jest.Mock).mockImplementation(mockExecute);

//       const response = await request(app)
//         .post('/auth/login')
//         .send({ email: 'test@example.com', password: 'password123' });

//       expect(validateEmail).toHaveBeenCalled();
//       expect(validatePassword).toHaveBeenCalled();
//       expect(mockExecute).toHaveBeenCalled();
//       expect(response.status).toBe(200);
//     });
//   });

//   describe('POST /auth/register', () => {
//     it('should call validateEmail, validatePassword and RegisterController.execute', async () => {
//       const mockExecute = jest.fn().mockImplementation((req, res) => res.status(201).send());
//       (RegisterController.prototype.execute as jest.Mock).mockImplementation(mockExecute);

//       const response = await request(app)
//         .post('/auth/register')
//         .send({ email: 'test@example.com', password: 'password123' });

//       expect(validateEmail).toHaveBeenCalled();
//       expect(validatePassword).toHaveBeenCalled();
//       expect(mockExecute).toHaveBeenCalled();
//       expect(response.status).toBe(201);
//     });
//   });
// });