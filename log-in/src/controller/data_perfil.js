const axios = require('axios');
const bcrypt = require('bcrypt');

const { ssl, url_database, puerto } = require('../config/server');

const CUSTOMER_SERVICE_URL = `${ssl}://${url_database}:${puerto}/database/Customer`;
const KYC_SERVICE_URL = `${ssl}://${url_database}:${puerto}/database/Kyc`;

const data_perfil = async (req, res) => {
  const { value } = req.query;

  try {
    // Obtain customer data by ID
    const { data: customerData } = await axios.get(`${CUSTOMER_SERVICE_URL}?query=id&value=${value}`);

    // Obtain KYC data by customer ID
    const { data: kycData } = await axios.get(`${KYC_SERVICE_URL}?query=customer_id&value=${value}`);

    // Extract specific properties from customer data
    const { email, password } = customerData.data;

    // Extract specific properties from KYC data
    const {
      first_name,
      last_name,
      document_file,
      document_type,
      age,
      cellphone_number,
      country,
      city,
      dni,
      avatar,
      customer_id,
      id
    } = kycData.data;

    // Send JSON response with extracted data, including DNI deshasheado
    res.json({
      first_name,
      last_name,
      avatar,
      email,
      country,
      city,
      dni: dni, // Aquí envías el DNI sin deshashear directamente
      document_type,
      document_file,
      age,
      cellphone_number,
      password,
      customer_id,
      id
    });
  } catch (error) {
    console.error('Error obtaining data:', error.message);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: error.message });
  }
};

// Example call to the function
module.exports = data_perfil;
