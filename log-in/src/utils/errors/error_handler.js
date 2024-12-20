const error_handler = (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
  });
};

module.exports = error_handler;
