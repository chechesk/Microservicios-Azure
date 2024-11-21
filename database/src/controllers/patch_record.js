const { models } = require('../database/db_config');
const { response } = require('../utils');

const patch_record = async (req, res, next) => {
  const { body } = req;
  const { model } = req.params;
console.log("pasa por aqui")
  const result = await models[model].update_record(body);

  response(res, 200, result);
};

module.exports = patch_record;
