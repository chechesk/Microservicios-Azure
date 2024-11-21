const axios = require('axios');
const { ssl, url_database, puerto } = require('../config/server');

module.exports = async (req, res) =>
{
  const { value } = req.query;

  const portfolio = await axios.get(`${ssl}://${url_database}:${puerto}/database/CustomerPortfolio?query=customer_id&value=${value}`);
  res.send(portfolio.data.data)
}