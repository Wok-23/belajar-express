const { genereteToken, verifyToken } = require('../../helpers/jwt');

describe('jwt', () => {
  let token;
  const payload = {
    id: 1,
    email: 'doe@email.com',
  };

  beforeAll(() => {
    token = genereteToken(payload);
  });

  describe('genereteToken', () => {
    describe('positive case', () => {
      test('genereteToken should return string', () => {
        expect(typeof token).toBe('string');
        expect(token).not.toBe(payload);
      });
    });
    describe('negative case', () => {
      test('Invalid input empty param should throw error', () => {
        expect(() => genereteToken()).toThrow(Error);
      });
    });
  });
  describe('verifyToken', () => {
    describe('positive case', () => {
      test('verifyToken should return payload', () => {
        const result = verifyToken(token);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('email');
        expect(result.id).toBe(payload.id);
      });
    });
    describe('negative case', () => {
      test('Invalid input should throw error', () => {
        expect(() => verifyToken()).toThrow(Error);
      });
    });
  });
});
