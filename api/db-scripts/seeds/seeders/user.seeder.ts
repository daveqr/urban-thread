import {Repository} from "typeorm";
import {UserEntity} from "../../../src/infrastructure/data/typeorm/entities/user.entity";
// @ts-ignore
import usersData from '../data/users.json';
import {v4 as uuidv4} from 'uuid';

export async function seedUsers(userRepository: Repository<UserEntity>): Promise<UserEntity[]> {
    const users = [];
    for (const userData of usersData) {
        const user: UserEntity = userRepository.create(userData) as unknown as UserEntity;

        user.uuid = uuidv4();
        // category.slug = slugify(category.name + ' c', {lower: true, remove: /[*+~.()'"!:@]/g});

        users.push(user);
    }

    await userRepository.save(users);
    return users;
}
