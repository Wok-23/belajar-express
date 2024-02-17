const { where } = require('sequelize');
const Category = require('../models').Category;

class CategoryController {
  static create(req, res, next) {
    const { name, description } = req.body;
    Category.create({
      name,
      description,
    })
      .then((category) => {
        res.status(201).json({ category });
      })
      .catch(next);
  }

  static readAll(req, res, next) {
    Category.findAll()
      .then((categories) => {
        res.status(200).json({
          status: 200,
          message: 'Data fatched',
          data: categories,
        });
      })
      .catch(next);
  }
  static readOne(req, res, next) {
    Category.findByPk(req.params.id)
      .then((category) => {
        res.status(200).json({
          status: 200,
          message: 'Data fatched',
          data: category,
        });
      })
      .catch(next);
  }
  static update(req, res, next) {
    Category.update(req.body, {
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
    Category.destroy({
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

module.exports = CategoryController;
