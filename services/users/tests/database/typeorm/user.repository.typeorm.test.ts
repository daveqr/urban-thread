import TypeORMUserRepository from "../../../src/infrastructure/data/typeorm/user.repository.typeorm";
import {faker} from "@faker-js/faker";
import User from "../../../src/core/models/user.model";
import {testDataSource} from "./test.data-source";
import UserEntity from "../../../src/infrastructure/data/typeorm/entities/user.entity";

beforeAll(async () => {
    await testDataSource.initialize();
});

afterAll(async () => {
    await testDataSource.destroy();
});

beforeEach(async () => {
    await testDataSource.synchronize(true);
});

describe("TypeORMUserRepository", () => {
    let userRepository: TypeORMUserRepository;
    let users: UserEntity[];

    beforeEach(async () => {
        userRepository = new TypeORMUserRepository(testDataSource);
        users = await insertTestUsers();
    });

    async function insertTestUsers() {
        const savePromises: Promise<UserEntity>[] = [];
        const users: UserEntity[] = [];
        for (let i = 0; i < 10; i++) {
            const userEntity = new UserEntity();
            userEntity.uuid = faker.string.uuid();
            userEntity.email = faker.internet.email();
            userEntity.password = faker.internet.password();
            userEntity.fname = faker.person.firstName();
            userEntity.lname = faker.person.lastName();
            users.push(userEntity);
            savePromises.push(testDataSource.getRepository(UserEntity).save(userEntity));
        }

        await Promise.all(savePromises);
        return users;
    }

    it("should find user by id", async () => {
        // When
        const userUuidToFind = users[0].uuid;
        const user = await userRepository.findById(userUuidToFind);

        // Then
        expect(user).not.toBeNull();
        if (user) {
            expect(user.id).toBe(userUuidToFind);
        }
    });

    it("should return null when user is not found by uuid", async () => {
        // When
        const user = await userRepository.findById("invalid-uuid");

        // Then
        expect(user).toBeNull();
    });

    it("should save a user", async () => {
        // Given
        const newUser = {
            id: "the-uuid",
            email: "test@example.com",
            password: "the-password",
            fname: "fname",
            lname: "lname"
        } as User;
        await userRepository.save(newUser);

        // When
        const user = await userRepository.findById(newUser.id);

        // Then
        expect(user).not.toBeNull();
    });
});