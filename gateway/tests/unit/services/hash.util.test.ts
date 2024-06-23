import {compare, hash, isHashed} from '../../../src/utils/hash.util';
import bcrypt from "bcrypt";

describe('Given hash functions', () => {
    describe('hash', () => {
        it('should hash a plain string', async () => {
            const plainPassword = 'password123';
            const hashedPassword = await hash(plainPassword);
            expect(hashedPassword).toBeDefined();
            expect(hashedPassword).not.toEqual(plainPassword);
        });
    });

    describe('compare', () => {
        it('should compare a plain string with its hash', async () => {
            const plainPassword = 'password123';
            const hashedPassword = await hash(plainPassword);
            const isMatch = await compare(plainPassword, hashedPassword);
            expect(isMatch).toBe(true);
        });

        it('should compare a plain string with a mismatched hash', async () => {
            const plainPassword = 'password123';
            const hashedPassword = await hash(plainPassword);
            const isMatch = await compare('wrongpassword', hashedPassword);
            expect(isMatch).toBe(false);
        });
    });

    describe('isHashed', () => {
        it('should identify a hashed string', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            expect(isHashed(hashedPassword)).toBe(true);
        });

        it('should identify a non-hashed string', () => {
            const plainPassword = 'password123';
            expect(isHashed(plainPassword)).toBe(false);
        });
    });
});
