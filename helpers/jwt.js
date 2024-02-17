const jwt = require('jsonwebtoken');
const secret = 'private';

const genereteToken = (payload) => {
  return jwt.sign(payload, secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { genereteToken, verifyToken };
