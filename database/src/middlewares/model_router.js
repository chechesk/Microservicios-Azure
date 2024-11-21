const ClientError = require('../utils/errors');
const { models } = require('../database/db_config');

/**
 * Middleware para validar el parámetro 'model' en la URL de la solicitud.
 * Verifica si el valor de 'model' está dentro de los valores permitidos.
 * Si es válido, permite que la solicitud continúe; de lo contrario, arroja un error de cliente.
 */
const model_router = (req, res, next) => {
  const { model } = req.params;

  // Verifica si el modelo especificado existe en el objeto 'models'
  if (models[model]) {
    // Si existe, pasa al siguiente middleware o controlador
    return next();
  } else {
    throw new ClientError(
      'Invalid Model parameter. Please use a valid model name.',
      400
    );
  }
};

module.exports = model_router;
