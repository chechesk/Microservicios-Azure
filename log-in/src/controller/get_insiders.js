const axios = require('axios');
const { ssl, url_database, puerto, insiders } = require('../config/server');


module.exports = async (req, res) =>
{
  const data = { "url": "https://finviz.com/insidertrading.ashx" }

  const insider = await axios.post(`${insiders}/insiders`, data);
  res.send(insider.data)
}