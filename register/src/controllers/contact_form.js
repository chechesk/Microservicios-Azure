const {send_message} = require('../nodemailer/email_templates');

module.exports = async (req, res) =>{
const { name, email,message }=  req.body

if(name, email,message){
  send_message(name, email,message)
  res.send('Mensaje enviado con exito')
}else{
  res.send('faltan datos')
}
}