import { ENV } from './env';
import { ExpressServer, AuthenticationRoutes, Environment } from './infrastructure';

// This is the main entry point of the application
console.log("Leo's server starting...");
  
// Initialize user routes
const authenticationRoutes = new AuthenticationRoutes();

// Initialize server
const nodeEnv: Environment = ENV.NODE_ENV as Environment || 'development';
const server = new ExpressServer(Number(ENV.PORT), ENV.HOST, nodeEnv);
server.registerRoutes(
  [{ path: '/auth', router: authenticationRoutes.router }]
);
server.start();

console.log("Leo's server started successfully!");