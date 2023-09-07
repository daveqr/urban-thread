const HashService = require('./hash.service');
const bcrypt = require('bcrypt');

describe('HashService', () => {
  describe('hash', () => {
    it('should hash a string', async () => {
      const plainPassword = 'password123';
      const hashedPassword = await HashService.hash(plainPassword);
      expect(hashedPassword).not.toBeUndefined();
      expect(hashedPassword).not.toEqual(plainPassword);
    });
  });

  describe('compare', () => {
    it('should compare a plain string with its hashed version and return true for a match', async () => {
      const plainPassword = 'password123';
      const hashedPassword = await HashService.hash(plainPassword);
      const isMatch = await HashService.compare(plainPassword, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should compare a plain string with its hashed version and return false for a mismatch', async () => {
      const plainPassword = 'password123';
      const hashedPassword = await HashService.hash(plainPassword);
      const isMatch = await HashService.compare('wrongpassword', hashedPassword);
      expect(isMatch).toBe(false);
    });
  });

  describe('isHashed', () => {
    it('should correctly identify a hashed string', () => {
      const hashedPassword = bcrypt.hashSync('password123', 10);
      expect(HashService.isHashed(hashedPassword)).toBe(true);
    });

    it('should correctly identify a non-hashed string', () => {
      const plainPassword = 'password123';
      expect(HashService.isHashed(plainPassword)).toBe(false);
    });
  });
});
