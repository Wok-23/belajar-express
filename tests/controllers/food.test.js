const FoodController = require('../../controllers/food');
const Food = require('../../models').Food;

describe('FoodController', () => {
  let req = {
    decode: {
      id: 1,
    },
  };
  let res = jest.fn();
  let next = jest.fn();

  describe('static create', () => {
    test('controller has static create', () => {
      expect(typeof FoodController.create).toBe('function');
    });
    test('static create will call Food.create', () => {
      req.body = {
        CategoryId: 2,
        price: '10000',
        quantity: 100,
        qtyout: 0,
        name: 'name test',
        description: 'deskripsi test',
      };

      jest.spyOn(Food, 'create').mockResolvedValueOnce({});

      FoodController.create(req, res, next);
      expect(Food.create).toHaveBeenCalled();
    });
  });

  describe('static readAll', () => {
    test('controller has static readAll', () => {
      expect(typeof FoodController.readAll).toBe('function');
    });
    test('static readAll will call Food.findAll', () => {
      jest.spyOn(Food, 'findAll').mockResolvedValueOnce({});

      FoodController.readAll(req, res, next);
      expect(Food.findAll).toHaveBeenCalled();
    });
  });

  describe('static readOne', () => {
    test('controller has static readOne', () => {
      expect(typeof FoodController.readOne).toBe('function');
    });
    test('static readAll will call Food.findAll', () => {
      req.params = {
        id: 1,
      };

      jest.spyOn(Food, 'findByPk').mockResolvedValueOnce({});

      FoodController.readOne(req, res, next);
      expect(Food.findByPk).toHaveBeenCalled();
    });
  });

  describe('static update', () => {
    test('controller has static update', () => {
      expect(typeof FoodController.update).toBe('function');
    });
    test('static update will call Food.update', () => {
      req.params = {
        id: 1,
      };
      jest.spyOn(Food, 'update').mockResolvedValueOnce({});
      FoodController.update(req, res, next);
      expect(Food.update).toHaveBeenCalled();
    });
  });

  describe('static delete', () => {
    test('controller has static delete', () => {
      expect(typeof FoodController.delete).toBe('function');
    });
    test('static delete will call Food.destroy', () => {
      req.params = {
        id: 1,
      };
      jest.spyOn(Food, 'destroy').mockResolvedValueOnce({});
      FoodController.delete(req, res, next);
      expect(Food.destroy).toHaveBeenCalled();
    });
  });
});
