const axios = require('axios');
const {ssl,url_database,puerto} = require('../config/server')

module.exports = {
  create_new: async () => {},
  get_record: async (query_condition) => {
    const { query, value } = query_condition;    
    const { data } = await axios.get(
      `${ssl}://${url_database}:${puerto}/database/Customer?query=${query}&value=${value}`
    );

    return data;
  },
};
