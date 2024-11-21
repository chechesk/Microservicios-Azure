const email_validator = require('./recover_password_email_validator');
const validate_code_validator = require('./validate_code_validator');
const auth_google = require('./auth.google')

module.exports ={
  email_validator,
  validate_code_validator,
  // auth_google 
}