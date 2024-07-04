export interface IdGenerator {
  generateId(): string;
}
export declare class UuidIdGenerator implements IdGenerator {
  generateId(): string;
}
