import winston from "winston";

export interface Logger {
  debug(message: string, ...meta: any[]): void;

  info(message: string, ...meta: any[]): void;

  warn(message: string, ...meta: any[]): void;

  error(message: string, ...meta: any[]): void;
}

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

  debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }

  info(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }
}
