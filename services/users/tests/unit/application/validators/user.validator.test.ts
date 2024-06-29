import {userSchema} from "../../../../src/application/validators/user.validator";

describe('User Schema Validation', () => {
    it('should validate a valid user object', () => {
        const validUser = {
            uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            email: 'test@example.com',
            password: 'password123',
            fname: 'John',
            lname: 'Doe'
        };

        const { error } = userSchema.validate(validUser);
        expect(error).toBeUndefined();
    });

    it('should invalidate a user object with missing required fields', () => {
        const invalidUser = {
            uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            email: 'test@example.com',
            // Missing password
            fname: 'John',
            lname: 'Doe'
        };

        const { error } = userSchema.validate(invalidUser);
        expect(error).toBeDefined();
    });

    it('should invalidate a user object with an invalid email', () => {
        const invalidUser = {
            uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            email: 'invalid-email',
            password: 'password123',
            fname: 'John',
            lname: 'Doe'
        };

        const { error } = userSchema.validate(invalidUser);
        expect(error).toBeDefined();
    });

    it('should invalidate a user object with a short password', () => {
        const invalidUser = {
            uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            email: 'test@example.com',
            password: '123', // Too short
            fname: 'John',
            lname: 'Doe'
        };

        const { error } = userSchema.validate(invalidUser);
        expect(error).toBeDefined();
    });

    it('should invalidate a user object with an invalid UUID', () => {
        const invalidUser = {
            uuid: 'invalid-uuid',
            email: 'test@example.com',
            password: 'password123',
            fname: 'John',
            lname: 'Doe'
        };

        const { error } = userSchema.validate(invalidUser);
        expect(error).toBeDefined();
    });
});
