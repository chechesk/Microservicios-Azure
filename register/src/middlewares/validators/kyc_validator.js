const { validationResult, body, check } = require('express-validator');
const { show_validation_result } = require('../../utils');

const kyc_validator = [
  body('first_name')
    .isString()
    .withMessage('First name must be a string')
    .notEmpty()
    .withMessage('First name must not be empty'),

  body('last_name')
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty()
    .withMessage('Last name must not be empty'),

  body('surname')
    .isString()
    .withMessage('Surname name must be a non-empty string'),

  body('age')
    .isInt({ min: 18, max: 80 })
    .withMessage('Age must be an integer between 18 and 80')
    .notEmpty()
    .withMessage('Age must not be empty'),

  body('birth_date')
    .notEmpty()
    .withMessage('Birth Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Birth Date must be a valid date in the format YYYY-MM-DD'),

  body('dni')
    .isString()
    .withMessage('Dni must be a non-empty string')
    .notEmpty()
    .withMessage('Dni must not be empty'),

  body('document_type')
    .isString()
    .withMessage('Document type must be a non-empty string')
    .notEmpty()
    .withMessage(
      'Document type must have one of the allowed formats: C.C, Pasaporte, C.C extranjería'
    ),

  body('document_file')
    .isString()
    .withMessage('Document file must be a non-empty string')
    .notEmpty()
    .withMessage(
      'Document type must have one of the allowed formats: JPG, PDF, or PNG'
    ),

  body('cellphone_number')
    .isInt()
    .withMessage('Cellphone number must be a non-empty integer'),

  body('country_code')
    .isString()
    .withMessage('Country code must be a non-empty string')
    .notEmpty()
    .withMessage('Country code must not be empty'),

  show_validation_result(validationResult),
];

module.exports = kyc_validator;
