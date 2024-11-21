const axios = require("axios");
const { chatIA_url, gateway_url, chate } = require("../config/server");


module.exports = async (req, res) =>
{
  const { id } = req.body;
  const chat = await axios.get(`${gateway_url}/chat?query=customer_id&value=${id}`)  

  const model_chat = {
    user_info: chat.data.data.user_info,
    user_profile_questions: chat.data.data.user_profile_questions,
    user_portfolio: chat.data.data.user_portfolio,
    chat_id: chat.data.data.chat_id,
    conversation_history: chat.data.data.conversation_history.slice(-2),
    user_prompt: ""
  }
  const create = await axios.post(`${chatIA_url}/start_chat`, model_chat)
  const response ={
    ...model_chat,
    conversation_history:[...model_chat.conversation_history]
  }
  return res.send(response)
} 