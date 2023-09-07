import bcrypt from 'bcrypt';

class HashService {
    static async hash(str: string) {
        const saltRounds = 10;
        try {
            const hashedStr = await bcrypt.hash(str, saltRounds);
            return hashedStr;
        } catch (error) {
            throw new Error('Error hashing string');
        }
    }

    static async compare(plainStr: string, hashedStr: string) {
        try {
            const isMatch = await bcrypt.compare(plainStr, hashedStr);
            return isMatch;
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
