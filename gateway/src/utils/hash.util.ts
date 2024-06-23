import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function hash(str: string): Promise<string> {
    try {
        return await bcrypt.hash(str, SALT_ROUNDS);
    } catch (error) {
        throw new Error('Error hashing string');
    }
}

async function compare(plainStr: string, hashedStr: string): Promise<boolean> {
    try {
        return await bcrypt.compare(plainStr, hashedStr);
    } catch (error) {
        throw new Error('Error comparing strings');
    }
}

function isHashed(str: string): boolean {
    const hashedPattern = /^\$2[aby]\$.{56}$/;
    return hashedPattern.test(str);
}

export {hash, compare, isHashed};
