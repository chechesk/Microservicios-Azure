const axios = require('axios');
const { response, create_random_code } = require('../utils');
const send_email = require('../nodemailer/email_templates');
const { ssl, url_database, puerto } = require('../config/server');

const create_record = async (req, res, next) => {
  const { model } = req.params;

  // genera y asigna un código de verificación aleatorio de 6 dígitos a req.body.verification_code
  const { hashed, unhashed } = await create_random_code();
  req.body.verification_code = hashed;

  // realiza la creacion del nuevo customer en la db
  const result = await axios.post(`${ssl}://${url_database}:${puerto}/${model}`, req.body);

  // envia correo con codigo de verificacion si el registro fue creado en la db
  if (result.status === 201 && !result.data.error) {
    send_email.validate_signup(req, unhashed);
  }

  response(res, result);
};

module.exports = create_record;
