"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidIdGenerator = void 0;
const uuid_1 = require("uuid");
class UuidIdGenerator {
    generateId() {
        return (0, uuid_1.v7)();
    }
}
exports.UuidIdGenerator = UuidIdGenerator;
