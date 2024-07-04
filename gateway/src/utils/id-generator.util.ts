import { v4 as uuidv4 } from "uuid";

export interface IdGenerator {
  generateId(): string;
}

export class UuidIdGenerator implements IdGenerator {
  generateId(): string {
    return uuidv4();
  }
}
