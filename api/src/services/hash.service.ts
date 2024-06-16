import bcrypt from 'bcrypt';

class HashService {
    static async hash(str: string) {
        const saltRounds = 10;
        try {
            return await bcrypt.hash(str, saltRounds);
        } catch (error) {
            throw new Error('Error hashing string');
        }
    }

    static async compare(plainStr: string, hashedStr: string) {
        try {
            return await bcrypt.compare(plainStr, hashedStr);
        } catch (error) {
            throw new Error('Error comparing strings');
        }
    }

    static isHashed(str: string) {
        const hashedPattern = /^\$2[aby]\$.{56}$/;
        return hashedPattern.test(str);
    }
}

module.exports = HashService;
