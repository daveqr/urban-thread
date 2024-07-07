import { Logger } from "./logger";
export declare class CentralLogger implements Logger {
    private logger;
    constructor(serviceName: string, combinedLogPath: string);
    private createLogger;
    debug(message: string, ...meta: any[]): void;
    info(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    error(message: string, ...meta: any[]): void;
}
