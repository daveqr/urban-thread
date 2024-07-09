import winston from "winston";
import { Logger } from "./logger";

export class CentralLogger implements Logger {
  private logger: winston.Logger;

  constructor(serviceName: string, combinedLogPath: string) {
    this.logger = this.createLogger(serviceName, combinedLogPath);
  }

  private createLogger(serviceName: string, combinedLogPath: string) {
    return winston.createLogger({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${serviceName}] ${level}: ${message} ${JSON.stringify(meta)}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: combinedLogPath }),
      ],
    });
  }

  debug(message: string, ...meta: unknown[]): void {
    this.logger.debug(message, ...meta);
  }

  info(message: string, ...meta: unknown[]): void {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: unknown[]): void {
    this.logger.error(message, ...meta);
  }
}
