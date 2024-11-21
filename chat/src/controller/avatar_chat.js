const axios = require("axios");
const { chatIA_url } = require("../config/server");

module.exports = async (req, res) => {
  // Se asume que el prompt proviene de la solicitud HTTP
  const { prompt } = req.body;

  // Realizar la solicitud al servicio chatIA
 
    const responseChatIA = await axios.post(`${chatIA_url}/avatar_chat`, { prompt });

    // Construir la respuesta que se enviará al cliente
    const response = {
      ...responseChatIA.data, // Se supone que responseChatIA.data tiene la estructura deseada
      prompt, // Añadir el prompt a la respuesta
    };

    // Enviar la respuesta al cliente
    return res.send(response);
};
