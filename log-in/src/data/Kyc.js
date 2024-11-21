const axios = require('axios');
const { ssl, url_database, puerto } = require('../config/server');

module.exports = {
  serch_by_customer_id: async (value) =>
  {
    const { data } = await axios.get(
      `${ssl}://${url_database}:${puerto}/database/Kyc?value=${value}`
    );
    return data;

  },
};