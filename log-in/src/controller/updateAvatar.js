const axios = require("axios");
const { ssl, url_database, puerto } = require("../config/server");

module.exports = async (req, res) => {
  try {
    const { id, avatar, customer_id } = req.body;

    // Verifica que el ID del cliente esté presente
    if (!id) {
      console.error('ID del cliente no proporcionado.');
      return res.status(400).json({ error: true, message: 'ID del cliente no proporcionado.' });
    }

    // Verifica que el avatar esté presente
    if (!avatar) {
      console.error('URL del avatar no proporcionada.');
      return res.status(400).json({ error: true, message: 'URL del avatar no proporcionada.' });
    }
 // Verifica que el avatar esté presente
 if (!customer_id) {
    console.error('URL del customer ID no registrado.');
    return res.status(400).json({ error: true, message: 'URL del customer ID no registrado.' });
  }
  const model_kyc = {
    id: id,
    avatar: avatar,
    customer_id: customer_id,
  }

    // Actualizar el servicio Kyc
    const updateKyc = await axios.patch(`${ssl}://${url_database}:${puerto}/Kyc`, model_kyc );

    // Verificar la respuesta del servicio Kyc
    if (updateKyc.data && updateKyc.data.error === false) {
      // Respuesta exitosa
      return res.json({ success: true });
    } else {
      console.error('Error al actualizar el servicio Kyc:', updateKyc.data);
      return res.status(500).json({ error: true, message: 'Error al actualizar el servicio Kyc' });
    }
  } catch (error) {
    console.error('Error en la actualización:', error);
    return res.status(500).json({ error: true, message: 'Error en la actualización' });
  }
};
