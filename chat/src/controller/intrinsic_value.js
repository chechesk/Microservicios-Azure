const axios = require("axios");
const { calculo } = require("../config/server");

module.exports = async (req, res) => {
 
    const data = req.body;
    
    const tredData ={
      symbol: data.symbol,
      targets: [3,6,9,12,18]
    }
    const intrinsic_value = axios.post(`${calculo}/intrinsic_value`, data);
    const intrinsic_news = axios.post(`${calculo}/stock_news`, data);
    const intrinsic_insiders = axios.post(`${calculo}/stock_insiders`, data);
    /* const intrinsic_stock = axios.post(`${calculo}/stock_prices`, data); */
    const trend_predictor = axios.post(`${calculo}/trend_predictor`, tredData);
    
    const [valueResponse, newsResponse, insidersResponse, /* stockResponse, */trend_Response] = await Promise.all([
      intrinsic_value,
      intrinsic_news,
      intrinsic_insiders,
      /* intrinsic_stock, */
      trend_predictor
    ]);

    const responseData = {
      intrinsic_value: valueResponse.data[0][0],
      intrinsic_news: newsResponse.data,
      intrinsic_insiders: insidersResponse.data,
      /* intrinsic_stock: stockResponse.data, */
      trend_predictor: trend_Response.data
    };

    res.json(responseData);

};
