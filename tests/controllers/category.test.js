const CategoryController = require('../../controllers/category');
const Category = require('../../models').Category;

describe('CategoryController', () => {
  let req = {
    decode: {
      id: 1,
    },
  };
  let res = jest.fn();
  let next = jest.fn();

  describe('static create', () => {
    test('controller has static create', () => {
      expect(typeof CategoryController.create).toBe('function');
    });
    test('static create will call Category.create', () => {
      req.body = {
        name: 'name test',
        description: 'deskripsi test',
      };

      jest.spyOn(Category, 'create').mockResolvedValueOnce({});

      CategoryController.create(req, res, next);
      expect(Category.create).toHaveBeenCalled();
    });
  });

  describe('static readAll', () => {
    test('controller has static readAll', () => {
      expect(typeof CategoryController.readAll).toBe('function');
    });
    test('static readAll will call Category.findAll', () => {
      jest.spyOn(Category, 'findAll').mockResolvedValueOnce({});

      CategoryController.readAll(req, res, next);
      expect(Category.findAll).toHaveBeenCalled();
    });
  });

  describe('static readOne', () => {
    test('controller has static readOne', () => {
      expect(typeof CategoryController.readOne).toBe('function');
    });
    test('static readAll will call Category.findAll', () => {
      req.params = {
        id: 1,
      };

      jest.spyOn(Category, 'findByPk').mockResolvedValueOnce({});

      CategoryController.readOne(req, res, next);
      expect(Category.findByPk).toHaveBeenCalled();
    });
  });

  describe('static update', () => {
    test('controller has static update', () => {
      expect(typeof CategoryController.update).toBe('function');
    });
    test('static update will call Category.update', () => {
      req.params = {
        id: 1,
      };
      jest.spyOn(Category, 'update').mockResolvedValueOnce({});
      CategoryController.update(req, res, next);
      expect(Category.update).toHaveBeenCalled();
    });
  });

  describe('static delete', () => {
    test('controller has static delete', () => {
      expect(typeof CategoryController.delete).toBe('function');
    });
    test('static delete will call Category.destroy', () => {
      req.params = {
        id: 1,
      };
      jest.spyOn(Category, 'destroy').mockResolvedValueOnce({});
      CategoryController.delete(req, res, next);
      expect(Category.destroy).toHaveBeenCalled();
    });
  });
});
