const axios = require('axios');
const { puerto, url_database, ssl } = require('../config/server');

module.exports = {
  get_record: async (query_condition) => {
    const { query, value } = query_condition;    
    const { data } = await axios.get(
      `${ssl}://${url_database}:${puerto}/database/Chat?query=${query}&value=${value}`
    )
    return data
  },
  create_new: async(chats)=>{
    const { data } = await axios.post(
      `${ssl}://${url_database}:${puerto}/Chat`,chats)
    return data
  },
  update_record: async(chats)=>{
    const { data } = await axios.patch(
      `${ssl}://${url_database}:${puerto}/Chat`,chats)
    return data
  }

};