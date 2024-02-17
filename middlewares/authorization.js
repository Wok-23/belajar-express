const authorization = (req, res, next) => {
  try {
    const userId = req.decode.id;
    if (userId === 1 || userId === 2) {
      next();
    } else {
      next({ message: 'Authorization' });
    }
  } catch (error) {
    next({ message: 'Authorization' });
  }
};

module.exports = { authorization };
