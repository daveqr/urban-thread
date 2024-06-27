import {DataSource, EntityManager} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IdGenerator} from "../../utils/id-generator.util";
import {UserService} from "../../core/services/user.service";
import {UserRepository} from "../../core/repositories/user.repository";
import User from "../../core/models/user.model";

@injectable()
export class UserRestService implements UserService {
    private entityManager: EntityManager;

    constructor(
        @inject('DataSource') dataSource: DataSource,
        @inject('UserRepository') private userRepository: UserRepository,
        @inject('IdGenerator') private idGenerator: IdGenerator
    ) {
        this.entityManager = dataSource.manager;
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async save(user: User): Promise<void> {
        await this.entityManager.transaction(async transactionalEntityManager => {
            let userToUpsert = await this.findById(user.id);

            if (userToUpsert) {
                userToUpsert.email = user.email;
                userToUpsert.password = user.password;
                userToUpsert.fname = user.fname;
                userToUpsert.lname = user.lname;
            } else {
                userToUpsert = new User();
                userToUpsert.id = this.idGenerator.generateId();
                userToUpsert.email = user.email;
                userToUpsert.password = user.password;
                userToUpsert.fname = user.fname;
                userToUpsert.lname = user.lname;
            }

            await this.userRepository.save(userToUpsert);
        });
    }
}
