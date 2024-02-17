const UserController = require('../../controllers/user');
const User = require('../../models').User;

describe('UserController', () => {
  let req = {
    decode: {
      id: 1,
    },
  };
  let res = jest.fn();
  let next = jest.fn();

  describe('static create', () => {
    test('controller has static create', () => {
      expect(typeof UserController.create).toBe('function');
    });
    test('static create will call User.create', () => {
      req.body = {
        name: 'Name',
        username: 'Username',
        password: 'test',
        RoleId: '2',
      };

      jest.spyOn(User, 'create').mockResolvedValueOnce({});

      UserController.create(req, res, next);
      expect(User.create).toHaveBeenCalled();
    });
  });

  describe('static readAll', () => {
    test('controller has static readAll', () => {
      expect(typeof UserController.readAll).toBe('function');
    });
    test('static readAll will call User.findAll', () => {
      jest.spyOn(User, 'findAll').mockResolvedValueOnce({});

      UserController.readAll(req, res, next);
      expect(User.findAll).toHaveBeenCalled();
    });
  });

  describe('static readOne', () => {
    test('controller has static readOne', () => {
      expect(typeof UserController.readOne).toBe('function');
    });
    test('static readAll will call User.findAll', () => {
      req.params = {
        id: 1,
      };

      jest.spyOn(User, 'findByPk').mockResolvedValueOnce({});

      UserController.readOne(req, res, next);
      expect(User.findByPk).toHaveBeenCalled();
    });
  });

  describe('static update', () => {
    test('controller has static update', () => {
      expect(typeof UserController.update).toBe('function');
    });
    test('static update will call User.update', () => {
      req.params = {
        id: 1,
      };
      jest.spyOn(User, 'update').mockResolvedValueOnce({});
      UserController.update(req, res, next);
      expect(User.update).toHaveBeenCalled();
    });
  });

  describe('static delete', () => {
    test('controller has static delete', () => {
      expect(typeof UserController.delete).toBe('function');
    });
    test('static delete will call User.destroy', () => {
      req.params = {
        id: 1,
      };
      jest.spyOn(User, 'destroy').mockResolvedValueOnce({});
      UserController.delete(req, res, next);
      expect(User.destroy).toHaveBeenCalled();
    });
  });
});
