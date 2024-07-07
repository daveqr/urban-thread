"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentralLogger = void 0;
const winston_1 = __importDefault(require("winston"));
class CentralLogger {
    constructor(serviceName, combinedLogPath) {
        this.logger = this.createLogger(serviceName, combinedLogPath);
    }
    createLogger(serviceName, combinedLogPath) {
        return winston_1.default.createLogger({
            level: process.env.NODE_ENV === "production" ? "info" : "debug",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf((_a) => {
                var { timestamp, level, message } = _a, meta = __rest(_a, ["timestamp", "level", "message"]);
                return `${timestamp} [${serviceName}] ${level}: ${message} ${JSON.stringify(meta)}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: combinedLogPath }),
            ],
        });
    }
    debug(message, ...meta) {
        this.logger.debug(message, ...meta);
    }
    info(message, ...meta) {
        this.logger.info(message, ...meta);
    }
    warn(message, ...meta) {
        this.logger.warn(message, ...meta);
    }
    error(message, ...meta) {
        this.logger.error(message, ...meta);
    }
}
exports.CentralLogger = CentralLogger;
