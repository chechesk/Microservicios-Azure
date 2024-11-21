const axios = require("axios")
const { reporte } = require("../config/server");
module.exports = async (req, res) =>
{

  const response = await axios.post(`${reporte}/reporte`, req.body)

  const sort_response = {
    bloque_1:response.data[`bloque 1`],
    bloque_2:response.data[`bloque 2`],
    bloque_3:response.data[`bloque 3`],
    bloque_4:response.data[`bloque 4`],
    bloque_5:response.data[`bloque 5`],
    eoy_returns: JSON.parse(response.data[`eoy_returns %`]),
    eoy_returns_benchmark: JSON.parse(response.data[`eoy_returns_benchmark %`]),
    portafolio_quantum: response.data[`portafolio_quantum %`],
    portafolio_benchmark: response.data[`benchmark %`]
  }

  res.send(sort_response)
}