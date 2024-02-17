const { hashPassword, comparePassword } = require('../../helpers/bcrypt');

describe('bcrypt', () => {
  let hashedPass;
  const plainPassword = 'admin12345';

  beforeAll(() => {
    hashedPass = hashPassword(plainPassword);
  });

  describe('hashPassowrd', () => {
    describe('positive case', () => {
      test('hashPassword should return string', () => {
        expect(typeof hashedPass).toBe('string');
        expect(hashedPass).not.toBe(plainPassword);
      });
    });
    describe('Negtive case', () => {
      test('Invalid input empty params: should throw an error', () => {
        expect(() => hashPassword()).toThrow(Error);
        expect(() => hashPassword(123)).toThrow(Error);
      });
    });
  });
  describe('compare password', () => {
    describe('positive case', () => {
      test('hashedPass and plainPassword should return true', () => {
        const result = comparePassword(plainPassword, hashedPass);
        expect(result).toBe(true);
      });
      test('any String and hashedPassword should return false', () => {
        const result = comparePassword('word', hashedPass);
        expect(result).toBe(false);
      });
    });
  });
});
