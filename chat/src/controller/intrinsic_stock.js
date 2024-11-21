const axios = require("axios");
const { calculo } = require("../config/server");

module.exports = async (req, res) => {
 
    const data = req.body;
    // Await the result of axios.post
    const response = await axios.post(`${calculo}/stock_prices`, data);
    // Extract the data from the response
    const intrinsic_stock = response.data;

    res.json(intrinsic_stock);

};
