import { config } from "dotenv";
import { Logger } from "./infrastructure";

config({path: "../.env"});
const logger = Logger.get();

export const ENV = {
  PORT: process.env.API_PORT || "3000",
  HOST: process.env.HOST || "localhost",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "",

  // Ajoute d'autres variables si nécessaire...
};

if (ENV.NODE_ENV === "development") {
  logger.info(`ENV Loaded: ${ENV.HOST}:${ENV.PORT} (${ENV.NODE_ENV})`);
}

if (!ENV.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in .env");
}
