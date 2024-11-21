const axios = require("axios");
const { ssl, url_database, puerto } = require("../config/server");

module.exports = async (req, res) =>{ 
  console.log(req.body)
 const result = await axios.post(`${ssl}://${url_database}:${puerto}/RiskScore`, req.body)
 console.log(result.data)
  res.json(result.data)
}