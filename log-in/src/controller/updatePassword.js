const axios = require("axios");
const { ssl, url_database, puerto } = require("../config/server");
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const { id, password } = req.body;

    // Verifica que el ID del cliente esté presente
    if (!id) {
      console.error('ID del cliente no proporcionado.');
      return res.status(400).json({ error: true, message: 'ID del cliente no proporcionado.' });
    }

    // Verifica que la nueva contraseña esté presente
    if (!password) {
      console.error('Nueva contraseña no proporcionada.');
      return res.status(400).json({ error: true, message: 'Nueva contraseña no proporcionada.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const model_Customer = {
      id: id,
      password: hashedPassword,
    };

    // Actualizar el servicio Kyc
    const updateCustomer = await axios.patch(`${ssl}://${url_database}:${puerto}/Customer`, model_Customer);

    // Verificar la respuesta del servicio Kyc
    if (updateCustomer.data && (updateCustomer.data.error === undefined || updateCustomer.data.error === false)) {
      // Respuesta exitosa
      return res.json({ success: true });
    } else {
      console.error('Error al actualizar el servicio Kyc:', updateCustomer.data);
      return res.status(500).json({ error: true, message: 'Error al actualizar el servicio Kyc' });
    }
  } catch (error) {
    console.error('Error en la actualización:', error);
    return res.status(500).json({ error: true, message: 'Error en la actualización' });
  }
};
