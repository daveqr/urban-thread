import winston from "winston";

export interface Logger {
    debug(message: string, ...meta: any[]): void;

    info(message: string, ...meta: any[]): void;

    warn(message: string, ...meta: any[]): void;

    error(message: string, ...meta: any[]): void;
}

export class WinstonLogger implements Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            format: winston.format.simple(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: 'error.log', level: 'error'}),
                new winston.transports.File({filename: 'combined.log'}),
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

const logger = new WinstonLogger();
export default logger;