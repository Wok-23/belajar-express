const { authorization } = require('../../middlewares/authorization');

describe('Authorization', () => {
  test('authorization is a function', () => {
    expect(typeof authorization).toBe('function');
  });
  describe('positive case', () => {
    test('should call next() when userId is 1 or 2', () => {
      const req = {
        decode: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      authorization(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('negative case', () => {
    test('should call next with error message when userId is neither 1 nor 2', () => {
      const req = {
        decode: {
          id: 3,
        },
      };
      const res = {};
      const next = jest.fn();

      authorization(req, res, next);

      expect(next).toHaveBeenCalledWith({ message: 'Authorization' });
    });
  });
});
