import cors from 'cors';
import { Environment } from '.';
export class CorsConfig {
  private environment: Environment;

  constructor(environment: Environment = 'development') {
    this.environment = environment;
  }

  getOptions() {
    const options = {
      development: {
        // origin: Frontend, Swagger, and Postman
        origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8080'],
        methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['X-Response-Time'],
        credentials: true,
        maxAge: 86400,
        optionsSuccessStatus: 200,
      },
      production: {
        // origin: Frontend and Swagger
        origin: ['https://mon-frontend.com', 'https://api.com/doc'],
        methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        maxAge: 3600,
        strictOrigins: true,
      },
      testing: {
          origin: '*',
          methods: ['GET'],
          allowedHeaders: ['Content-Type'],
      },
    };

    return options[this.environment] || options.development;
  }

  getCorsMiddleware() {
    return cors(this.getOptions());
  }
}