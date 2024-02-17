const AuthController = require('../../controllers/auth');
const User = require('../../models').User;

describe('UserController', () => {
  let req = {
    body: {
      email: 'doe@mail.com',
      password: 'doe123',
    },
  };
  let res = jest.fn();
  let next = jest.fn();

  describe('static login', () => {
    test('controller has static login', () => {
      expect(typeof AuthController.login).toBe('function');
    });
    test('static create will call User.findOne', () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({});

      AuthController.login(req, res, next);
      expect(User.findOne).toHaveBeenCalled();
    });
  });
});
