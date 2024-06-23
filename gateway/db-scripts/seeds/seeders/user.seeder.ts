import {Repository} from "typeorm";
import {UserEntity} from "../../../src/infrastructure/data/typeorm/entities/user.entity";
import usersData from '../data/users.json';
import {UuidIdGenerator} from "../../../src/utils/id-generator.util";

export async function seedUsers(userRepository: Repository<UserEntity>): Promise<UserEntity[]> {
    const users = [];
    for (const userData of usersData) {
        const user: UserEntity = userRepository.create(userData) as unknown as UserEntity;

        const idGenerator = new UuidIdGenerator();
        user.uuid = idGenerator.generateId();
        // category.slug = slugify(category.name + ' c', {lower: true, remove: /[*+~.()'"!:@]/g});

        users.push(user);
    }

    await userRepository.save(users);
    return users;
}
