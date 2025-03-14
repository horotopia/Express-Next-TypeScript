import helmet, { HelmetOptions } from 'helmet';
import { RequestHandler } from 'express';
import { Environment } from './environmentType';

export class HelmetConfig {
  private environment: Environment;

  constructor(environment: Environment = 'development') {
    this.environment = environment;
  }

  getOptions(): HelmetOptions {
    const options: Record<Environment, HelmetOptions> = {
      development: {
        contentSecurityPolicy: false, // Désactivé en dev pour éviter les blocages avec Webpack/Vite
        crossOriginOpenerPolicy: { policy: 'same-origin' },
        crossOriginResourcePolicy: { policy: 'same-origin' },
        dnsPrefetchControl: { allow: true },
        frameguard: { action: 'sameorigin' },
        hidePoweredBy: true,
        hsts: false, // Pas nécessaire en dev
        ieNoOpen: true,
        noSniff: true,
        originAgentCluster: true,
        permittedCrossDomainPolicies: false,
        referrerPolicy: { policy: 'no-referrer' },
      },
      production: {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'https://trusted.cdn.com'"],
            styleSrc: ["'self'", "'https://trusted.cdn.com'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
          },
        },
        crossOriginOpenerPolicy: { policy: 'same-origin' },
        crossOriginResourcePolicy: { policy: 'same-origin' },
        dnsPrefetchControl: { allow: false },
        frameguard: { action: 'deny' },
        hidePoweredBy: true,
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        ieNoOpen: true,
        noSniff: true,
        originAgentCluster: true,
        permittedCrossDomainPolicies: false,
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      },
      testing: {
        contentSecurityPolicy: false,
        frameguard: false,
        hidePoweredBy: true,
        hsts: false,
      },
    };

    return options[this.environment] || options.development;
  }

  getHelmetMiddleware(): RequestHandler {
    return helmet(this.getOptions());
  }
}
