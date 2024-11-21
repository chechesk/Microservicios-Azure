const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
{
  const Chat = sequelize.define(
    'chat',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_info: {
        type: DataTypes.JSON,
        
      },
      user_profile_questions: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: []
      },
      user_portfolio: {
        type: DataTypes.JSON,
        
      },
      chat_id: {
        type: DataTypes.STRING,
        
      },
    
      conversation_history: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: []
      },
      user_prompt:{
        type: DataTypes.STRING,
      }
    },
    { timestamps: true }
  )


  Chat.list = async () =>
  {
    const chat_list = await Chat.findAll();
    return chat_list;
  };

  Chat.get_record = async (query_condition) =>
  {
    const record_found = await Chat.findOne({
      where: query_condition,
    });
    return record_found;
  };

  Chat.create_new = async (chats) =>
  {
    const new_chat = await Chat.create({
      user_info: chats.user_info,
      user_profile_questions:chats.user_profile_questions.map(e => ({ q: e.q, a: e.a })),
      user_portfolio:chats.user_portfolio,
      chat_id: chats.chat_id,
      conversation_history: chats.conversation_history.map(e => ({ prompt: e.prompt, gpt: e.gpt })),
      user_prompt: chats.user_prompt,
      customer_id: chats.user_info.id
    });
    return new_chat;
  };

  Chat.activate_record = async (chats) =>
  {
    await Chat.update({ where: { email } });
  };

  // update mediante id.
  Chat.update_record = async (chats) =>
  {
    const { chat_id } = chats;
 
      const [num_updated] = await Chat.update(
        { user_info: chats.user_info,
          user_profile_questions:chats.user_profile_questions.map(e => ({ q: e.q, a: e.a })),
          user_portfolio:chats.user_portfolio,
          chat_id: chats.chat_id,
          conversation_history: chats.conversation_history.map(e => ({ prompt: e.prompt, gpt: e.gpt })),
          user_prompt: chats.user_prompt,
          customer_id: chats.user_info.id  },
        { where: { chat_id } }
      );

      if (num_updated > 0) {
        return 'Customer updated successfully';
      } else {
        console.log('Error updating customer');
      }
   
 
  return Chat
}
}