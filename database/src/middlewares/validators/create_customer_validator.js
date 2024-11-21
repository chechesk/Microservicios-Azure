const { validationResult, check } = require('express-validator');
const { show_validation_result } = require('../../utils');

const create_customer_validator = [
  // Middleware de validación para el campo 'email' en la creación de clientes.
  check('email').notEmpty().withMessage('Email is required'),

  // Verifica que el campo 'email' tenga un formato de correo electrónico válido y proporciona un mensaje de error personalizado si no lo tiene.
  check('email')
    .isEmail()
    .withMessage(
      'Email must be in a valid format, e.g., (example@example.com)'
    ),

  // validacion para verification_code
  check('verification_code')
    .notEmpty()
    .withMessage('Verification code is required')
    .isString()
    .withMessage('Verification code must be a string'),
  // Utiliza una función personalizada para manejar los resultados de validación.
  show_validation_result(validationResult),
];
module.exports = create_customer_validator;
