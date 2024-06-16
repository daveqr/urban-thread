import {DataSource, Repository} from "typeorm";
import {UserRepository} from "../../../domain/repositories/user.repository";
import User from "../../../domain/models/user.model";
import UserEntity from "../../../entities/user.entity";

class SQLiteUserRepository implements UserRepository {
    private dataSource: DataSource;
    private userRepository: Repository<UserEntity>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.userRepository = this.dataSource.getRepository(UserEntity);
    }

    async findByUuid(uuid: string): Promise<User | null> {
        // const userRepository = this.dataSource.getRepository(UserEntity);

        const userEntity = await this.userRepository.findOne({where: {uuid: uuid}});

        if (userEntity) {
            return {
                uuid: userEntity.uuid,
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

            userEntity.uuid = user.uuid;
            userEntity.email = user.email;
            userEntity.password = user.password;
            userEntity.fname = user.fname;
            userEntity.lname = user.lname;

            await transactionalEntityManager.save(userEntity);
        });
    }
}

export default SQLiteUserRepository;
