const axios = require('axios');
const { hash_verification } = require('../utils');
const { client_error } = require('../utils/errors');
const { Customer } = require("../data");
const bcrypt = require('bcrypt');
const { ssl, url_database } = require('../config/server');

module.exports = async (req, res) =>
{
  const { email, verification_code, new_password, new_password_repet } = req.body;

  //Busca el customer por email
  let customer = await Customer.serch_by_email(email);
  let code_db = customer.data.data.verification_code;

  // comprueba que el codigo enviado por el cliente sea el mismo que el de la bd
  const code_verified = await hash_verification(verification_code, code_db);

  //confirma que ingreso correctamente la clave 2 veces
  if (new_password !== new_password_repet) throw new client_error('Password must be the same');

  //si el codigo de verificacion es correcto hashea el nuevo password lo asigna y borra el codigo de verificacion
  if (code_verified === true) {
    let data = {
      ...customer.data.data,
      password: await bcrypt.hash(new_password, 10),
      verification_code: null
    }
    axios.patch(`${ssl}://${url_database}:${puerto}/Customer`, data);

    res.send('password modified successfully')
  } else throw new client_error('Invalid credentials');
}