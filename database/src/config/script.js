// script.js
const { Client } = require('pg');
const axios = require('axios');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = require('../config/env');
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
});

async function checkForNewRecords() {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM tu_tabla WHERE condicion_para_nuevos_registros');

    if (result.rows.length > 0) {
      await axios.post('http://localhost:3000/ruta_para_funcion_python', { nuevosRegistros: result.rows });
      console.log('Nuevos registros enviados correctamente.');
    } else {
      console.log('No hay nuevos registros.');
    }
  } catch (error) {
    console.error('Error al verificar nuevos registros:', error);
  } finally {
    await client.end();
  }
}

module.exports = { checkForNewRecords };
