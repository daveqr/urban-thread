import Category from "../../../src/core/models/category.model";
import { HighlightedCategory } from "../../../src/core/models/highlighted-category.model";
import { CategoryService } from "../../../src/core/services/category.service";
import { DataSource, EntityManager } from "typeorm";
import { UserRepository } from "../../../src/core/repositories/user.repository";
import User from "../../../src/core/models/user.model";
import { UserService } from "../../../src/core/services/user.service";
import { UuidIdGenerator } from "../../../src/utils/id-generator.util";

export class CategoryServiceTestDouble implements CategoryService {
  findCategoryByUuid(uuid: string): Promise<Category | null> {
    return Promise.resolve(null);
  }

  findAllCategories(): Promise<Category[]> {
    return Promise.resolve([]);
  }

  findHighlightedCategories(): Promise<HighlightedCategory[]> {
    return Promise.resolve([]);
  }
}

class UserServiceImpl implements UserService {
  private entityManager: EntityManager;

  constructor(
    dataSource: DataSource,
    private userRepository: UserRepository,
  ) {
    this.entityManager = dataSource.manager;
  }

  async findById(uuid: string): Promise<User | null> {
    return await this.userRepository.findById(uuid);
  }

  async save(user: User): Promise<void> {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      let userToUpsert = await this.findById(user.id);

      if (userToUpsert) {
        userToUpsert.email = user.email;
        userToUpsert.password = user.password;
        userToUpsert.fname = user.fname;
        userToUpsert.lname = user.lname;
      } else {
        userToUpsert = new User();
        userToUpsert.id = new UuidIdGenerator().generateId();
        userToUpsert.email = user.email;
        userToUpsert.password = user.password;
        userToUpsert.fname = user.fname;
        userToUpsert.lname = user.lname;
      }

      await this.userRepository.save(userToUpsert);
    });
  }
}
