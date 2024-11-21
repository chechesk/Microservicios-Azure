const axios = require("axios");
const { ssl, url_database, puerto, chatIA_url, gateway_url, chate } = require("../config/server");


module.exports = async (req, res) =>
{
  const { id, user_prompt , language,init } = req.body;
  console.log(language)
  const chat = await axios.get(`${gateway_url}/chat?query=customer_id&value=${id}`)
  const lang = language.includes('es') ? 'es-ES': 'en-EN'
  
   
  const upChat = {
    id,
    user_prompt,
    language:lang,
    init,
    beta:0
  }
 
  const update_chat = await axios.post(`${chatIA_url}/chat`, upChat)

  const model_chat = {
    user_info: chat.data.data.user_info,
    user_profile_questions: chat.data.data.user_profile_questions,
    user_portfolio: chat.data.data.user_portfolio,
    chat_id: chat.data.data.chat_id,
    conversation_history: [...chat.data.data.conversation_history, { prompt: user_prompt, gpt: update_chat.data.output }],
    user_prompt: user_prompt
  }
  const update = await axios.patch(`${ssl}://${url_database}:${puerto}/Chat`, model_chat)
  return res.send(model_chat)
}