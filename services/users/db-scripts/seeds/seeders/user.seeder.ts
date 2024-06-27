import {Repository} from "typeorm";
import userData from '../data/users.json';
import {UuidIdGenerator} from "../../../src/utils/id-generator.util";
import UserEntity from "../../../src/infrastructure/data/typeorm/entities/user.entity";

export async function seedUsers(userEntityRepository: Repository<UserEntity>): Promise<UserEntity[]> {
    const userEntities = [];
    for (const usersDatum of userData) {
        const userEntity: UserEntity = userEntityRepository.create(userEntities) as UserEntity;

        userEntity.uuid = new UuidIdGenerator().generateId();
        userEntities.push(userEntity);
    }

    await userEntityRepository.save(userEntities);

    return userEntities;
}
