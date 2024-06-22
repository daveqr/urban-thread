import User from "../models/user.model";
import {DataSource, EntityManager} from "typeorm";
import {UserRepository} from "../repositories/user.repository";
import {v4 as uuidv4} from "uuid";

export interface UserService {
    findByUuid(uuid: string): Promise<User | null>;

    save(user: User): Promise<void>;
}

export class UserServiceImpl implements UserService {
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
