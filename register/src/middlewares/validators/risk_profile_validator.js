const { validationResult, check } = require('express-validator');
const { show_validation_result } = require('../../utils');

module.exports = [
  check('occupation')
    .exists()
    .isString()
    .withMessage('occupation does not exist or is not a text'),

  check('onthly_income')
    .exists()
    .isFloat()
    .withMessage('onthly_income does not exist or is not a float'),

  check('type_of_income')
    .optional()
    .isString()
    .withMessage('type_of_income require specific field'),
  // .isIn(['inheritance', 'investments', 'salary', 'savings', 'other'])

  check('capital_willing_to_invest')
    .exists()
    .isFloat()
    .withMessage('capital_willing_to_invest does not exist or is not a float'),

  check('investment_horizon')
    .optional()
    .isString()
    .withMessage('investment_horizon require specific field'),
  // .isIn(['3 months', '6 months', '12 months', '> 12 months'])

  check('investment_experience_level')
    .optional()
    .isString()
    .withMessage('investment_experience_level require specific field'),
  // .isIn(['high', 'moderate', 'low'])

  check('temporary_losses')
    .exists()
    .isBoolean()
    .withMessage('temporary_losses does not exist or is not a boolean'),

  check('high_or_moderate_returns')
    .optional()
    .isString()
    .withMessage('high_or_moderate_returns require specific field'),
  // .isIn(['high returns', 'moderate returns'])

  check('capital_willing_to_lose')
    .optional()
    .isString()
    .withMessage('capital_willing_to_lose require specific field'),
  // .isIn([
  //   'less than 5%',
  //   'less than 10%',
  //   'less than 50%',
  //   'less than 70%',
  //   'less than 90%',
  // ])

  check('risk_tolerance')
    .optional()
    .isString()
    .withMessage('risk_tolerance require specific field'),
  // .isIn(['high', 'medium', 'low'])

  check('reinvest_profits')
    .exists()
    .isBoolean()
    .withMessage('reinvest_profits does not exist or is not a boolean'),

  check('temporary_loss_reaction')
    .optional()
    .isString()
    .withMessage('temporary_loss_reaction require specific field'),
  // .isIn(['sell', 'hold', 'buy'])

  check('long_term_financial_goals')
    .optional()
    .isString()
    .withMessage('long_term_financial_goals require specific field'),
  // .isIn([
  //   'preserve capital',
  //   'moderate growth',
  //   'achieve profitability and growth',
  // ])

  check('max_loss_percentage_per_day')
    .optional()
    .isString()
    .withMessage('max_loss_percentage_per_day require specific field'),
  // .isIn([
  //   'less than 1%',
  //   'less than 2%',
  //   'less than 5%',
  //   'less than 8%',
  //   'less than 10%',
  // ])

  show_validation_result(validationResult),
];
