const jwt = require('../helpers/jwt');

const authentication = (req, res, next) => {
  try {
    let token = req.headers.token;
    let decode = jwt.verifyToken(token);
    req.decode = decode;
    next();
  } catch (error) {
    next({ message: 'Authentication' });
  }
};

module.exports = { authentication };
