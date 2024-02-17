const User = require('../models').User;

class UserController {
  static create(req, res, next) {
    const { name, username, password, RoleId } = req.body;
    User.create({
      name,
      username,
      password,
      RoleId,
    })
      .then((user) => {
        res.status(201).json({ user });
      })
      .catch(next);
  }
  static readAll(req, res, next) {
    User.findAll()
      .then((users) => {
        res.status(200).json({
          status: 200,
          message: 'Data fatched',
          data: users,
        });
      })
      .catch(next);
  }
  static readOne(req, res, next) {
    User.findByPk(req.params.id)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: 'Data fatched',
          data: user,
        });
      })
      .catch(next);
  }
  static update(req, res, next) {
    User.update(req.body, {
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
    User.destroy({
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
module.exports = UserController;
