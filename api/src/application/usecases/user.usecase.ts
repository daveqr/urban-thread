import User from "../../core/models/user.model";
import {DataSource, EntityManager} from "typeorm";
import {userSchema} from "../validators/user.validator";
import {UserService} from "../../core/services/user.service";
import {inject, injectable} from "tsyringe";

@injectable()
class UserUseCase {
    private entityManager: EntityManager;

    constructor(
        @inject('DataSource') private dataSource: DataSource,
        @inject('UserService') private userService: UserService) {
        this.entityManager = this.dataSource.manager;
    }

    async findById(id: string): Promise<User | null> {
        return await this.userService.findById(id);
    }

    async save(user: User): Promise<void> {
        userSchema.validate(user);

        await this.entityManager.transaction(async transactionalEntityManager => {
            await this.userService.save(user);
        });
    }
}

export default UserUseCase;
