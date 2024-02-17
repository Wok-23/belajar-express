const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json({ status: 400, err: err.message });
  } else {
    res.status(500).json({ status: 500, err: err.message });
  }
};

module.exports = { errorHandler };
