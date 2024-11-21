// config database
//const url_database = 'localhost'  
const url_database = 'database'
const ssl = 'http'
const puerto = '7001'

//config server Chat
const chat_url = 'chat.quantumdassets.com'
const puerto_chat = '8000'
const ssl_chat = 'http'

//config gateway
const gateway_url = 'http://back.quantumdassets.com:7000' 
 //const gateway_url = 'http://localhost:7000' 

//config chatIa
const chatIA_url = 'http://chat.quantumdassets.com:8000'

//config calcular portfolio
const calculo = 'http://chat.quantumdassets.com:8001'

//config calcular portfolio
const insiders = 'http://calculo.quantumdassets.com:6800'
 //const insiders = 'http://localhost:6800'
const simulacion = 'http://simulacion.quantumdassets.com:8001'
module.exports = {
    url_database,
    ssl,
    puerto,
    chat_url,
    puerto_chat,
    ssl_chat,
    gateway_url,
    chatIA_url,
    calculo,
    insiders,
    simulacion
}