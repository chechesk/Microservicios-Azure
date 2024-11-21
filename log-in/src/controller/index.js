const { catched_async } = require('../utils/errors');
const recover_password_email = require('./recover_password_email');
//const recover_password_sms = require('./recover_password_sms');
const validate_code = require('./validate_code');
const create_portfolio = require('./create_portfolio');
const get_portfolio = require('./get_portfolio');
const data_perfil = require('./data_perfil')
const uploadIMG = require('./upload')
const updateAvatar = require('./updateAvatar')
const get_insiders = require('./get_insiders')
const editPortfolio = require('./editPortfolio')

module.exports = {
  recover_password_email: catched_async(recover_password_email),
  /* recover_password_sms:catched_async(recover_password_sms), */
  validate_code: catched_async(validate_code),
  create_portfolio: catched_async(create_portfolio),
  get_portfolio: catched_async(get_portfolio),
  get_insiders: catched_async(get_insiders),
  data_perfil: catched_async(data_perfil),
  updateAvatar: catched_async(updateAvatar),
  uploadIMG : uploadIMG,
  editPortfolio:catched_async(editPortfolio)
}