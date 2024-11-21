const custom_error = require('./errors/custom_error');

const error_handler = (err, req, res, next) => {
  // Busca en el diccionario de errores si el error se esta administrando en custom_error().js
  const { message, statusCode } = custom_error(err, next);

  // Si el error está definido en custom_error, se utiliza el statusCode del diccionario
  // Si el error no está definido en custom_error, se utiliza el statusCode original del error
  // Si ninguno de los casos anteriores se aplica, se utiliza el statusCode 500 por defecto
  res.status(statusCode || err.statusCode || 500).send({
    error: true,
    message,
  });
};

module.exports = error_handler;
