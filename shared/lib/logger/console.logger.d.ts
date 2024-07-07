import { Logger } from "./logger";
export declare class ConsoleLogger implements Logger {
    debug(message: string, ...meta: any[]): void;
    info(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    error(message: string, ...meta: any[]): void;
}
export default ConsoleLogger;
