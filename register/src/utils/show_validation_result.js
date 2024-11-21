const { client_error } = require('./errors');

// Este middleware muestra los mensajes de error en la validacion de datos.
const show_validation_result = (validationResult) => {
  return (req, res, next) => {
    validationResult(req);

    // Obtiene los errores de validación del resultado.
    const errors = validationResult(req);

    // Si no hay errores, continúa con la siguiente función en la cadena de middleware.
    if (errors.isEmpty()) {
      return next();
    }

    // Obtiene el mensaje de error del primer error encontrado.
    const errorMessages = errors.array()[0].msg;
    // Lanza un error del cliente con el mensaje de error y un código de estado 400.
    throw new client_error(errorMessages, 400);
  };
};

module.exports = show_validation_result;
