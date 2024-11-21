const { Customer } = require("../data");
const { create_random_code } = require('../utils');
const send_email = require('../nodemailer/email_templates');
const axios = require('axios');
const { ssl, url_database, puerto } = require("../config/server");

module.exports = async (req, res) =>
{
  const { email } = req.body;

  //Busca el customer por email
  let customer = await Customer.serch_by_email(email);

  //si no encuentra customer lo envia a regitrarse
  if (!customer) return res.send('The customer does not exist, you must register')

  // verifica que customer este active si no es asi deveria enviarle el email nuevamnete
  if (customer.data.data.active === false) return res.send('your account must be verified')

  //si existe customer y esta verificado crea el codigo
  const { hashed, unhashed } = await create_random_code();

  //modifica el codigo de verificacion en la db
  let data = {
    ...customer.data.data,
    verification_code: hashed
  }
  axios.patch(`${ssl}://${url_database}:${puerto}/Customer`, data);
  //envia el email con el codigo
  send_email.validate_signup(req, unhashed);
  res.send('check your mail')
}