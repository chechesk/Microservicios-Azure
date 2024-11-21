const { Chat } = require("../data");

module.exports = async (req, res) =>{ 
  
  const chats = await Chat.get_record(req.query)
   res.send(chats)

}