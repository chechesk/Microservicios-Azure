// Diccionario de mensajes de error personalizados para manejar errores específicos.

// Función para manejar mensajes de error personalizados basados en el nombre del error.
const custom_error = (err, next) => {
  const error_dictionary = {
    SequelizeUniqueConstraintError: {
      statusCode: 400,
      message: 'Record already exists in the database',
    },
    SequelizeForeignKeyConstraintError: {
      statusCode: 400,
      message: 'Invalid data reference. Foreign key constraint error',
    },
  };
  // Busca un mensaje personalizado en el diccionario de errores usando el nombre del error.
  const custom_error_message = error_dictionary[err.name];
  // Si se encuentra un mensaje personalizado, se devuelve; de lo contrario, se devuelve el mensaje de error original.
  return custom_error_message || { message: err.message };
};

module.exports = custom_error;
