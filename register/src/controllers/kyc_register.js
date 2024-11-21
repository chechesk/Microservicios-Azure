const axios = require('axios');
const { Customer } = require('../data');
const { client_error } = require('../utils/errors');
const { response } = require('../utils');
const {
  hash_sensitive_fields,
  ensure_valid_country_city,
  ensure_age_consistency,
} = require('../helpers');
const { ssl, url_database, puerto } = require('../config/server');

const kyc_register = async (req, res) => {
  const { value } = req.query;
  const { body } = req;
  const { country_code, city, dni, age, birth_date } = body;

  // valida que el pais exista y que la ciudad corresponda al pais
  ensure_valid_country_city(country_code, city);

  // obtiene el customer para realizar validaciones
  const { data: customer } = await Customer.get_record(req.query);

  // compruebo que el customer tenga la cuenta validada, de lo contrario arrojo error
  if (customer.active === false)
    throw new client_error('Customer must be verifyed before create kyc');

  // hashe los campos con datos sensibles
  const hashed_fields = await hash_sensitive_fields({ dni });

  // verifica que la edad conicida con la fecha de nacimiento
  // ensure_age_consistency(age, birth_date);

  // construyo un nuevo objeto con los datos del body y le agrego las foreign keys cusomter_id y cosuntry_id
  const new_body = {
    ...body,
    ...hashed_fields,
    customer_id: value,
  };

  // creo el kyc
  const kyc_result = await axios.post(`${ssl}://${url_database}:${puerto}/Kyc`, new_body);

  response(res, kyc_result);
};

module.exports = kyc_register;
