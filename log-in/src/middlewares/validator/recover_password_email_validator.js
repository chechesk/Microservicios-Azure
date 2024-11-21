const { validationResult, check } = require('express-validator');
const { show_validation_result } = require('../../utils');

module.exports = [
  check('email').notEmpty().withMessage('Email is required'),

  // Verifica que el campo 'email' tenga un formato de correo electrónico válido y proporciona un mensaje de error personalizado si no lo tiene.
  check('email')
    .isEmail()
    .withMessage(
      'Email must be in a valid format, e.g., (example@example.com)'
    ),

  show_validation_result(validationResult),
];

