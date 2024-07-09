import { Logger } from "./logger";
export declare class CentralLogger implements Logger {
    private logger;
    constructor(serviceName: string, combinedLogPath: string);
    private createLogger;
    debug(message: string, ...meta: unknown[]): void;
    info(message: string, ...meta: unknown[]): void;
    warn(message: string, ...meta: unknown[]): void;
    error(message: string, ...meta: unknown[]): void;
}
