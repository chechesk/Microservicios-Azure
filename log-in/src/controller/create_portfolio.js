const axios = require('axios');
const { ssl, url_database, puerto, calculo, gateway_url,simulacion } = require('../config/server');

module.exports = async (req, res) =>
{
  const { id } = req.body;

  const data_chat = await axios.get(`${gateway_url}/chat?query=customer_id&value=${id}`)

  let result = {
    user_portfolio: {
      profile: data_chat.data.data.user_portfolio.profile,
      max_drawdown: data_chat.data.data.user_portfolio.max_drawdown,
      stocks: data_chat.data.data.user_portfolio.stocks,
      etfs: data_chat.data.data.user_portfolio.etfs,
      funds: data_chat.data.data.user_portfolio.funds

    },
    simulacion:[]  

  } 
  const data = {
    simulation: result,
    customer_id: id
  }
  await axios.post(`${ssl}://${url_database}:${puerto}/CustomerPortfolio`, data)
  res.send(result)
}
 