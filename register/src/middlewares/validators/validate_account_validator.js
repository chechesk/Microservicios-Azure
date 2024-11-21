const { validationResult, body } = require('express-validator');
const { show_validation_result } = require('../../utils');

const validate_account_validator = [
  body('verification_code')
    .isString()
    .withMessage('The validation code must be a string'),

  // Agregar cualquier otra validación que necesites aquí
  show_validation_result(validationResult),
];

module.exports = validate_account_validator;
