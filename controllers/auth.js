const fs = require('fs');
const { comparePassword } = require('../helpers/bcrypt');
const { genereteToken } = require('../helpers/jwt');

const User = require('../models').User;

class AuthController {
  static login(req, res, next) {
    const { username, password } = req.body;
    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (!user) {
          return next({ message: 'User not found' });
        }
        if (comparePassword(password, user.password)) {
          let payload = {
            id: user.id,
            username: user.username,
            RoleId: user.RoleId,
          };
          let token = genereteToken(payload);
          res.status(200).json({
            id: user.id,
            username: user.username,
            RoleId: user.RoleId,
            token,
          });
        } else {
          next({ message: 'Invalid email or password' });
        }
      })
      .catch(next);
  }
}
module.exports = AuthController;
