const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { ssl, url_database, puerto } = require('../config/server');

const SECRET_KEY = process.env.SECRET_KEY || 'Quamtum';
const CUSTOMER_SERVICE_URL = `${ssl}://${url_database}:${puerto}/database/Customer`;
const KYC_SERVICE_URL = `${ssl}://${url_database}:${puerto}/database/Kyc`;
const RISKPROFILE_URL = `${ssl}://${url_database}:${puerto}/database/RiskProfile`;

const authLogin = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    // Hacer una solicitud al servicio Dockerizado para obtener los datos del usuario
    const { data: customerData } = await axios.get(CUSTOMER_SERVICE_URL, {
      params: { email },
    });

    if (!customerData || !customerData.data || customerData.data.length === 0) {
      throw new UnauthorizedError('Usuario no encontrado');
    }

    // Acceder al primer usuario en el array de datos que tenga el mismo correo electrónico
    const user = customerData.data.find((userData) => userData.email === email);

    // Verificar que el usuario tenga la propiedad 'password'
    if (!user || !user.password) {
      throw new UnauthorizedError('Datos de usuario inválidos');
    }

    // Comprobar la contraseña utilizando bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError('Contraseña incorrecta');
    }

    // Segunda solicitud para obtener datos específicos del KYC por customer_id
    const { data: kycData } = await axios.get(KYC_SERVICE_URL, {
      params: { customer_id: user.id }
    });

    const kycRecord = kycData.data.find((kyc) => kyc.customer_id === user.id);

    if (!kycRecord) {
      throw new UnauthorizedError('Datos KYC no encontrados');
    }

    const { first_name, last_name } = kycRecord; // Extraer solo first_name y last_name

      // Tercera solicitud para obtener datos específicos del KYC por customer_id
      const { data: riskData } = await axios.get(RISKPROFILE_URL, {
        params: { customer_id: user.id }
      });
  
      const riskRecord = riskData.data.find((risk) => risk.customer_id === user.id);
  
      if (!riskRecord) {
        throw new UnauthorizedError('Datos Risk Profile no encontrados');
      }
  
      const { capital_willing_to_invest } = riskRecord; // Extraer solo first_name y last_name

    response.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        firstName: user.user_name,
        email: user.email,
        role: user.role,
        // Agregar otras propiedades del usuario si es necesario
      },
      kycData: { first_name, last_name },
      riskData: {capital_willing_to_invest},
      token: jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '50h' }),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authLogin;
