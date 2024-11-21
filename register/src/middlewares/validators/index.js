const create_customer = require('./create_customer_validator');
const validate_account = require('./validate_account_validator');
const kyc_form = require('./kyc_validator');
const risk_profile = require('./risk_profile_validator');

module.exports = {
  create_customer,
  validate_account,
  risk_profile,
  kyc_form,
};
