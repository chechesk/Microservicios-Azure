const axios = require('axios');
const { url_database, ssl, puerto } = require('../config/server');


module.exports = {
  get_record: async (query_condition) => {
    const { query, value } = query_condition;    
    
    const { data } = await axios.get(
      `${ssl}://${url_database}:${puerto}/database/ChatIA?query=${query}&value=${value}`
    )
    console.log(data)
    return data.data
  },
  create_new: async(chats)=>{
    const { data } = await axios.post(
      `${ssl}://${url_database}:${puerto}/ChatIA`,chats)
    return data
  },
  update_record: async(chats)=>{
    console.log(chats)
    console.log("-----------")
    const { data } = await axios.patch(
      `${ssl}://${url_database}:${puerto}/ChatIA`,chats)
      console.log(data)
    return data
  }

};