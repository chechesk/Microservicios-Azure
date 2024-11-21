// Diccionario de mensajes de error personalizados para manejar errores específicos.
// Función para manejar mensajes de error personalizados basados en el nombre del error.
const custom_error = (err, next) => {
  //console.log(err);
  const error_dictionary = {
    // este error viene de la validacion de datos create_customer_validator
    Error: {
      statusCode: err.statusCode,
      // client_error(message, err.statusCode)
      message: {
        error: true,
        message: err.message,
      },
    },
  };
  const custom_error_structure = error_dictionary[err.name];

  return custom_error_structure || { message: err.message };
};

module.exports = custom_error;
