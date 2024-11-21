const {catched_async} = require("../utils");
const create_chat = require('./create_chat');
const get_chat = require('./get_chat');
const update_chat = require('./update_chat');
const login_start_chat = require('./login_start_chat');
const reporte = require('./reporte');
const inversion_anual = require('./inversion_anual')
const create_risk_score = require('./create_risk_score')
const intrinsic_value = require('./intrinsic_value')
const intrinsic_stock = require('./intrinsic_stock')
const avatar_chat = require('./avatar_chat')

module.exports = {
  create_chat: catched_async(create_chat),
  get_chat:catched_async(get_chat),
  update_chat: catched_async(update_chat),
  login_start_chat: catched_async(login_start_chat),
  reporte: catched_async(reporte),
  inversion_anual:catched_async(inversion_anual),
  create_risk_score:catched_async(create_risk_score),
  intrinsic_value:catched_async(intrinsic_value),
  intrinsic_stock:catched_async(intrinsic_stock),
  avatar_chat:catched_async(avatar_chat)
}