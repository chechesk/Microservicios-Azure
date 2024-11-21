const { response } = require('../utils');
const axios = require('axios');
const { Customer, Kyc } = require('../data');
const { client_error } = require('../utils/errors');
const { ssl, url_database, puerto, chatIA_url,api_riskProfile, gateway_url } = require('../config/server');

module.exports = async (req, res, next) =>
{
  const { value } = req.query;
  const data = req.body;
console.log(data)
  let customer = await Customer.get_record(req.query);
  let kyc = await Kyc.serch_by_customer_id(req.query);

  if (customer?.active === false || !kyc) throw new client_error('Customer must be verified and possess a KYC before creating the risk profile.')

  data.customer_id = value;

  const result = await axios.post(`${ssl}://${url_database}:${puerto}/RiskProfile`, data);

  const send = {
    age: kyc.data[0].age,
    occupation: data.occupation,
    monthly_income: data.onthly_income,
    investment_experience_level: data.investment_experience_level,
    type_of_income: data.type_of_income,
    capital_willing_to_invest: data.capital_willing_to_invest,
    temporary_losses: data.temporary_losses === true ? 'si':'no' ,
    high_or_moderate_returns: data.high_or_moderate_returns,
    capital_willing_to_lose: data.capital_willing_to_lose,
    risk_tolerance: data.risk_tolerance,
    investment_horizon: data.investment_horizon,
    reinvest_profits: data.reinvest_profits === true ? 'si':'no' ,
    temporary_loss_reaction: data.temporary_loss_reaction,
    long_term_financial_goals: data.long_term_financial_goals,
    max_loss_percentage_per_day: data.max_loss_percentage_per_day,
  }

  const risk_profile = await axios.post(`${api_riskProfile}/puntuacion`, send)
  let assignment = {}

  if (risk_profile.status === 200) {
    assignment = await axios.post(`${api_riskProfile}/pesos`, { puntos: risk_profile.data[1] })
  }
  const assignment_algorithm = {
    id: value,
    profile: risk_profile.data[0],
    max_drawdown: assignment.data[1],
    stocks: assignment.data[0][0],
    etfs: assignment.data[0][1],
    funds: assignment.data[0][2]
  }
console.log(assignment_algorithm)
 await axios.post(`${gateway_url}/chat/RiskScore`, assignment_algorithm)
 res.json(assignment_algorithm)

};