const { create_random_code } = require('../utils');
const send_email = require('../nodemailer/email_templates');
const { Customer } = require('../data');

module.exports = async (req, res) =>
{
  const { email } = req.body
  // genera y asigna un código de verificación aleatorio de 6 dígitos a req.body.verification_code
  const { hashed, unhashed } = await create_random_code();
  req.body.verification_code = hashed;

  // realiza la creacion del nuevo customer en la db
  const result = await Customer.get_record({ query: "email", value: email })

  // envia correo con codigo de verificacion si el registro fue creado en la db
  if (result && !result.data.error) {
    send_email.validate_signup(req, unhashed);
  }

  res.send(result);
}; 