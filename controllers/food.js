const { where } = require('sequelize');
const Food = require('../models').Food;

class FoodController {
  static create(req, res, next) {
    const { name, description, CategoryId, price, quantity, qtyout } = req.body;
    Food.create({
      name,
      description,
      CategoryId: Number(CategoryId),
      price,
      quantity: Number(quantity),
      qtyout: Number(qtyout),
    })
      .then((food) => {
        res.status(200).json({ food });
      })
      .catch(next);
  }

  static readAll(req, res, next) {
    Food.findAll()
      .then((foods) => {
        res.status(200).json({
          status: 200,
          message: 'Data fatched',
          data: foods,
        });
      })
      .catch(next);
  }
  static readOne(req, res, next) {
    Food.findByPk(req.params.id)
      .then((food) => {
        res.status(200).json({
          status: 200,
          message: 'Data fatched',
          data: food,
        });
      })
      .catch(next);
  }
  static update(req, res, next) {
    Food.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Food.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next);
  }
}

module.exports = FoodController;
