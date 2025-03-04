import { config } from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import { Logger } from './configs/logger';

/**
 * Express server configuration
 */
export class ExpressServer {
  private app: Express;
  private port: number;
  private host: string;

  constructor(port: number = 3000, host: string = 'localhost') {
    this.app = express();
    this.port = port;
    this.host = host;
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    // Dotenv
    config();
    // CORS
    this.app.use(cors());
    // Helmet
    this.app.use(helmet());
    // Logger
    const logger = Logger.get();

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (process.env.MODE_ENV === "development") {
        Logger.get().http(
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
  public registerRoutes(routes: any[]): void {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  /**
   * Start the Express server
   */
  public listen(): void {
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