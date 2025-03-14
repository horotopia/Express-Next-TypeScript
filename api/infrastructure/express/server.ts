import express, { Express, Request, Response, NextFunction } from 'express';
import { CorsConfig, Environment, HelmetConfig, Logger } from '.';

/**
 * Express server configuration
 */
export class ExpressServer {
  private app: Express;
  private port: number;
  private host: string;
  private nodeEnv: Environment;

  constructor(port: number = 3000, host: string = 'localhost', nodeEnv: Environment = 'development') {
    this.app = express();
    this.port = port;
    this.host = host;
    this.nodeEnv = nodeEnv;
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    // CORS
    const corsConfig = new CorsConfig(this.nodeEnv);
    this.app.use(corsConfig.getCorsMiddleware());
    // Helmet
    const helmetConfig = new HelmetConfig(this.nodeEnv);
    this.app.use(helmetConfig.getHelmetMiddleware());
    // Logger
    const logger = Logger.get();

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (this.nodeEnv === "development") {
        logger.http(
          `${req.method} ${req.url} - ${req.ip} - ${req.headers["user-agent"]}`,
        );
      }
      next();
    });
    // Parse JSON request body
    this.app.use(express.json());
    // Parse URL-encoded request body
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Register routes with the Express application
   * @param routes - Array of routes handlers
   */
  public registerRoutes(routes: { path: string; router: express.Router }[]): void {
    routes.forEach((route) => {
      console.log(`Registering route: path=${route.path}, router=${typeof route.router}`);
      if (!route.path || !route.router) {
        throw new Error(`Invalid route configuration: ${JSON.stringify(route)}`);
      }
      this.app.use(route.path, route.router);
    });
  }

  /**
   * Start the Express server
   */
  public start(): void {
    this.app.listen(this.port, this.host, () => {
      Logger.get().info(`Server is running on http://${this.host}:${this.port}`);
      Logger.get().info(`Server is running on http://${this.host}:${this.port}/doc`);
    });
  }

  /**
   * Get the Express application
   */
  public getApp(): Express {
    return this.app;
  }
}