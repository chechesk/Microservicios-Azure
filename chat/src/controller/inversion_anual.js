/* {
  "mensaje": "Si realizas una inversión inicial de $200,000 y aportes mensuales de $200,000, durante 60 meses, con una rentabilidad estimada del 9.5% e.a*, podrías obtener unos rendimientos aproximados de $3,526,454 para un total en tu inversión de $15,726,454 al finalizar este período.",
  "datos": [
    {
      "anio": 1,
      "valor_aportes": 2600000,
      "rendimientos": 147006.4209421007,
      "total_inversion": 2747006.4209421007
    },
    {
      "anio": 2,
      "valor_aportes": 5000000,
      "rendimientos": 546797.0758015219,
      "total_inversion": 5546797.075801521
    },
    {
      "anio": 3,
      "valor_aportes": 7400000,
      "rendimientos": 1224460.1890883262,
      "total_inversion": 8624460.189088324
    },
    {
      "anio": 4,
      "valor_aportes": 9800000,
      "rendimientos": 2207573.930984082,
      "total_inversion": 12007573.93098408
    },
    {
      "anio": 5,
      "valor_aportes": 12200000,
      "rendimientos": 3526453.5384342535,
      "total_inversion": 15726453.53843425
    }
  ]
} */
const axios = require("axios")
const { calculo } = require("../config/server");
module.exports = async (req, res) =>
{
const info = req.body
console.log(info)
const data ={
  
    inversion_inicial: info.inversion_inicial,
    tasa_interes: info.tasa_interes,
    compuestos_por_año: 12,
    años: info.años,
    adicion_mensual: info.adicion_mensual
 
}
console.log(data)
  const response = await axios.post(`${calculo}/inversion_anual`, data)

  

  res.send(response.data)
}