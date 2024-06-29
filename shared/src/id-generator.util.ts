"use strict";
import {v7 as uuidv7} from 'uuid';

export interface IdGenerator {
    generateId(): string;
}

export class UuidIdGenerator implements IdGenerator {
    generateId(): string {
        return uuidv7();
    }
}
