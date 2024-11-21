const axios = require('axios');
const { ssl, url_database, puerto } = require('../config/server');

module.exports = {
  serch_by_email: async (email) =>
  {
    return await axios.get(`${ssl}://${url_database}:${puerto}/database/Customer?query=email&value=${email}`)
  },
  update_record: async (customer) =>
  {
    let model = "Customer"
    return axios.patch(`${ssl}://${url_database}:${puerto}/${model}`, customer)
  }
};