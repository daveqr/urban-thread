import "reflect-metadata"
import sinon, {SinonStubbedInstance} from 'sinon';
import {UserService} from "../../../../src/core/services/user.service";
import UserUseCaseImpl from "../../../../src/application/usecases/user.usecase";
import {AppDataSource} from "../../../../src/data-source";
import User from "../../../../src/core/models/user.model";
import {UserServiceTestDouble} from "../../test-doubles/user.service.test-double";

describe("User use case", () => {
    let userService: SinonStubbedInstance<UserService>;
    let userUseCase: UserUseCaseImpl;

    beforeEach(() => {
        userService = sinon.createStubInstance<UserService>(UserServiceTestDouble as any);
        userUseCase = new UserUseCaseImpl(AppDataSource, userService);
    });

    it('should find user by id', async () => {
        userService.findById.withArgs('id').resolves({
            id: 'id',
        } as User);

        // When
        const user = await userUseCase.findById('id');

        // Then
        expect(user).not.toBeNull();
        expect(user?.id).toBe('id');
    });

    it('should return null when user with non-existent id is queried', async () => {
        // Given
        userService.findById.withArgs('nonexistent').resolves(null);

        // When
        const user = await userUseCase.findById('nonexistent');

        // Then
        expect(user).toBeNull();
    });
});
