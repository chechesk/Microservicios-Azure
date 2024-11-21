const register_risk_profile = require('./register_risk_profile');
const kyc_register = require('./kyc_register');
const { kyc_form } = require('../middlewares/validators');
const risk_profile_validator = require('../middlewares/validators/risk_profile_validator');
const { client_error } = require('../utils/errors');
const { show_validation_result } = require('../utils');

const form_router = async (req, res, next) => {
  const { form } = req.params;

  const dictionary = {
    Kyc: kyc_register,
    RiskProfile: register_risk_profile,
  };

  const model_controller = dictionary[form];

  if (model_controller) {
    await model_controller(req, res);
  } else {
    throw new client_error(
      'Invalid Form parameter. Please use a valid model name.'
    );
  }
};

module.exports = form_router;
