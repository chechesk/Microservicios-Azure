const axios = require('axios');
const { response, hash_verification } = require('../utils');
const { client_error } = require('../utils/errors');
const { ssl, url_database, puerto } = require('../config/server');

const validate_record_account = async (req, res, next) => {
  const { model } = req.params;
  const { email, verification_code } = req.body;

  const result = await axios.get(
    `${ssl}://${url_database}:${puerto}/database/${model}?query=email&value=${email}`
  );

  // de la respuesta extraigo solo el objeto con los datos del record encontrado
  const record_found = result.data.data;

  // express-validator: comprueba que el usuario no haya sido validado anteriormente */
  if (record_found.active === true)
    throw new client_error(
      `Validation of ${model} is not allowed because it has already been validated.`
    );

  // obtengo el codigo de verificacion del customer desde la bd
  const code_to_compare = record_found.verification_code;
  // comprueba que el codigo enviado por el cliente sea el mismo que el de la bd
  const code_verified = await hash_verification(
    verification_code,
    code_to_compare,
    next
  );

  if (code_verified === true) {
    const data_to_update = {
      active: true,
      id: record_found.id,
      verification_code: null,
    };

    // se conecta con la db para validar el usuario
    const validate_account = await axios.patch(
      `${ssl}://${url_database}:${puerto}/${model}`,
      data_to_update
    );

    // devuelve la respuesta satisfactoria
    response(res, validate_account);
  }
  // lanza una excepcion
  else throw new client_error('Invalid credentials');
};

module.exports = validate_record_account;
