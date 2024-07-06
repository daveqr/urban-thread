import { Logger } from "shared/lib/logger.util";

const consoleLogger: Logger = {
  debug: (message: string, ...meta: string[]) => {
    console.debug(`[DEBUG] ${message}`, ...meta);
  },
  info: (message: string, ...meta: string[]) => {
    console.info(`[INFO] ${message}`, ...meta);
  },
  warn: (message: string, ...meta: string[]) => {
    console.warn(`[WARN] ${message}`, ...meta);
  },
  error: (message: string, ...meta: string[]) => {
    console.error(`[ERROR] ${message}`, ...meta);
  },
};

export default consoleLogger;
