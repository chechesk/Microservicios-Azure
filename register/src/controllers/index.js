const { catched_async } = require('../utils/errors');
const register_record = require('./register_record');
const validate_record_account = require('./validate_record_account');
const kyc_register = require('./kyc_register');
const register_risk_profile = require('./register_risk_profile');
const form_router = require('./form_router');
const resend_email = require('./resend_email');
const contact_form = require('./contact_form');

module.exports = {
  register_record: catched_async(register_record),
  validate_record_account: catched_async(validate_record_account),
  kyc_register: catched_async(kyc_register),
  register_risk_profile: catched_async(register_risk_profile),
  form_router: catched_async(form_router),
  resend_email:catched_async(resend_email),
  contact_form:catched_async(contact_form)
};
