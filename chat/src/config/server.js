//const url_database = 'localhost'  
const url_database = 'database'  
const ssl = 'http'
const puerto = '7001'

//config server Chat
const chat_url = 'chatnew.quantumdassets.com'
const puerto_chat = '7000'
const ssl_chat = 'http'

const chate = 'http://chat.quantumdassets.com:8000'
//config gateway

const gateway_url = 'http://back.quantumdassets.com:7000' 
 //const gateway_url = 'http://localhost:7000'  


//config chatIa
const reporte = 'http://chat.quantumdassets.com:8000'
const chatIA_url ='http://gpt.quantumdassets.com:8000' //cambiar cuando este listo el nuevo chat
//config calculo
const calculo =  'http://calculo.quantumdassets.com:8002' 

module.exports ={
    url_database,
    ssl,
    puerto,
    chat_url,
    puerto_chat,
    ssl_chat,
    gateway_url,
    chatIA_url,
    calculo,
    chate,
    reporte
}