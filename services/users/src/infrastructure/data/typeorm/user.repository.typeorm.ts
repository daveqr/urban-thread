import {DataSource, Repository} from "typeorm";
import {UserRepository} from "../../../core/repositories/user.repository";
import User from "../../../core/models/user.model";
import UserEntity from "./entities/user.entity";
import {inject, injectable} from "tsyringe";

@injectable()
class TypeORMUserRepository implements UserRepository {
    private userRepository: Repository<UserEntity>;

    constructor(
        @inject('DataSource') private dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(UserEntity);
    }

    async findById(id: string): Promise<User | null> {
        const userEntity = await this.userRepository.findOne({where: {uuid: id}});

        if (userEntity) {
            return {
                id: userEntity.uuid,
                email: userEntity.email,
                password: userEntity.password,
                fname: userEntity.fname,
                lname: userEntity.lname
            };
        } else {
            return null;
        }
    }

    async save(user: User): Promise<void> {
        const entityManager = this.dataSource.manager;

        await entityManager.transaction(async transactionalEntityManager => {
            const userEntity = new UserEntity();

            userEntity.uuid = user.id;
            userEntity.email = user.email;
            userEntity.password = user.password;
            userEntity.fname = user.fname;
            userEntity.lname = user.lname;

            await transactionalEntityManager.save(userEntity);
        });
    }
}

export default TypeORMUserRepository;
