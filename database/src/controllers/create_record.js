const { models } = require('../database/db_config');
const { response } = require('../utils');

const post_record = async (req, res, next) => {
  const { model } = req.params;
  const { body } = req;

  // crea un nuevo registro dependiendo del modelo que llega por params
  const result = await models[model].create_new(body);

  // devuelve una respuesta personalizada
  response(res, 201, result);
};

module.exports = post_record;
