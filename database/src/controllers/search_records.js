const { models } = require('../database/db_config');
const client_error = require('../utils/errors/index');
const { response } = require('../utils/');

const search_records = async (req, res) => {
  const { model } = req.params;
  const { query, value } = req.query;
  let result;

  if (query) {
    // Si se proporciona un valor de búsqueda (query), intenta buscar un solo registro
    result = await models[model].get_record({ [query]: value });
  } else {
    // Si no se proporciona un valor de búsqueda, obtiene una lista de todos los registros
    result = await models[model].list();
  }
  if ((Array.isArray(result) && result.length === 0) || result === null) {
    // Si no se encontraron registros, lanza una excepción personalizada
    throw new client_error(
      `No ${model} matching the search criteria were found`,
      404
    );
  } else {
    // Si se encontró un resultado (ya sea un solo registro o una lista),
    // envía una respuesta exitosa con el resultado
    response(res, 200, result);
  }
};

module.exports = search_records;
