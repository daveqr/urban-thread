import Category from "../../../src/core/models/category.model";
import {HighlightedCategory} from "../../../src/core/models/highlighted-category.model";
import {CategoryService} from "../../../src/core/services/category.service";
import {DataSource, EntityManager} from "typeorm";
import {UserRepository} from "../../../src/core/repositories/user.repository";
import User from "../../../src/core/models/user.model";
import {v4 as uuidv4} from "uuid";
import {UserService} from "../../../src/core/services/user.service";

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

    constructor(dataSource: DataSource, private userRepository: UserRepository) {
        this.entityManager = dataSource.manager;
    }

    async findByUuid(uuid: string): Promise<User | null> {
        return await this.userRepository.findByUuid(uuid);
    }

    async save(user: User): Promise<void> {
        await this.entityManager.transaction(async transactionalEntityManager => {
            let userToUpsert = await this.findByUuid(user.uuid);

            if (userToUpsert) {
                userToUpsert.email = user.email;
                userToUpsert.password = user.password;
                userToUpsert.fname = user.fname;
                userToUpsert.lname = user.lname;
            } else {
                userToUpsert = new User();
                userToUpsert.uuid = uuidv4();
                userToUpsert.email = user.email;
                userToUpsert.password = user.password;
                userToUpsert.fname = user.fname;
                userToUpsert.lname = user.lname;
            }

            await this.userRepository.save(userToUpsert);
        });
    }
}
