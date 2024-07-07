import { Logger } from "./logger";

export class ConsoleLogger implements Logger {
  debug(message: string, ...meta: any[]): void {
    console.debug(`[DEBUG] ${message}`, ...meta);
  }

  info(message: string, ...meta: any[]): void {
    console.info(`[INFO] ${message}`, ...meta);
  }

  warn(message: string, ...meta: any[]): void {
    console.warn(`[WARN] ${message}`, ...meta);
  }

  error(message: string, ...meta: any[]): void {
    console.error(`[ERROR] ${message}`, ...meta);
  }
}

export default ConsoleLogger;
