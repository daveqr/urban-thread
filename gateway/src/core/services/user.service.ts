import User from "../models/user.model";
import { DataSource, EntityManager } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { inject, injectable } from "tsyringe";
import { IdGenerator } from "../../utils/id-generator.util";

export interface UserService {
  findById(id: string): Promise<User | null>;

  save(user: User): Promise<void>;
}
