import {userSchema} from "../../../../src/application/validators/user.validator";

describe('User Validation Schema', () => {
    it('Should validate a valid user object', async () => {
        const validUser = {
            uuid: '3a0e86f4-39b2-4dcd-bef8-c13e61272e07',
            email: 'test@example.com',
            password: '123456',
            fname: 'John',
            lname: 'Doe',
        };

        await expect(userSchema.validateAsync(validUser)).resolves.toEqual(validUser);
    });

    it('Should invalidate user with missing lname field', async () => {
        const invalidUser = {
            uuid: '3a0e86f4-39b2-4dcd-bef8-c13e61272e07',
            email: 'test@example.com',
            password: 'password123',
            fname: 'John',
            // lname is missing
        };

        await expect(userSchema.validateAsync(invalidUser)).rejects.toThrowError();
    });

    it('Should invalidate user with missing fname field', async () => {
        const invalidUser = {
            uuid: '3a0e86f4-39b2-4dcd-bef8-c13e61272e07',
            email: 'test@example.com',
            password: 'password123',
            // fname is missing
            lname: 'Smith',
        };

        await expect(userSchema.validateAsync(invalidUser)).rejects.toThrowError();
    });

    it('Should invalidate user with invalid email format', async () => {
        const invalidUser = {
            uuid: '3a0e86f4-39b2-4dcd-bef8-c13e61272e07',
            email: 'invalid-email-format',
            password: 'password123',
            fname: 'John',
            lname: 'Doe',
        };

        await expect(userSchema.validateAsync(invalidUser)).rejects.toThrowError();
    });

    it('Should invalidate user with password length less than 6', async () => {
        const invalidUser = {
            uuid: '3a0e86f4-39b2-4dcd-bef8-c13e61272e07',
            email: 'test@example.com',
            password: '12345',
            fname: 'John',
            lname: 'Doe',
        };

        await expect(userSchema.validateAsync(invalidUser)).rejects.toThrowError();
    });
});
