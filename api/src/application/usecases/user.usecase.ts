import {UserRepository} from "../../core/repositories/user.repository";
import User from "../../core/models/user.model";
import UserDto from "../dtos/user.dto";
import {DataSource, EntityManager} from "typeorm";
import {userSchema} from "../validators/user.validator";
import UserService from "../../core/users/user.service";

class UserUseCase {
    private dataSource: DataSource;
    private userService: UserService;
    private entityManager: EntityManager;

    constructor(dataSource: DataSource, userRepository: UserRepository, userService: UserService) {
        this.dataSource = dataSource;
        this.userService = userService;
        this.entityManager = this.dataSource.manager;
    }

    async findByUuid(uuid: string): Promise<UserDto | null> {
        const user = await this.userService.findByUuid(uuid);

        if (user) {
            return {
                uuid: user.uuid,
                email: user.email,
                password: user.password,
                fname: user.fname,
                lname: user.lname
            };
        } else {
            return null;
        }
    }

    async save(userDto: UserDto): Promise<void> {
        userSchema.validate(userDto);

        await this.entityManager.transaction(async transactionalEntityManager => {
            await this.userService.save(this.mapDtoToUser(userDto));
        });
    }

    private mapDtoToUser(userDto: UserDto): User {
        const user = new User();
        user.uuid = userDto.uuid;
        user.email = userDto.email;
        user.password = userDto.password;
        user.fname = userDto.fname;
        user.lname = userDto.lname;

        return user;
    }
}

export default UserUseCase;