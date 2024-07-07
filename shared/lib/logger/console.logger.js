"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    debug(message, ...meta) {
        console.debug(`[DEBUG] ${message}`, ...meta);
    }
    info(message, ...meta) {
        console.info(`[INFO] ${message}`, ...meta);
    }
    warn(message, ...meta) {
        console.warn(`[WARN] ${message}`, ...meta);
    }
    error(message, ...meta) {
        console.error(`[ERROR] ${message}`, ...meta);
    }
}
exports.ConsoleLogger = ConsoleLogger;
exports.default = ConsoleLogger;
