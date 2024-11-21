const http = require('https');
const path = require('path');
const fs = require('fs');
const { db_conn } = require('./src/database/db_config');
const { countries_loader } = require('./src/utils');
const server = require('./src/server');
// const { checkForNewRecords } = require('./src/config/script');

const PORT = 7001;

// Rutas a los archivos generados por ssh-keygen
const keyPath = path.resolve(__dirname, 'src', 'certificate', 'privkey1.pem');
const certPath = path.resolve(__dirname, 'src', 'certificate', 'cert1.pem');

// Cargar la clave privada y el certificado PEM
 const options = {
     key: fs.readFileSync(keyPath),
     cert: fs.readFileSync(certPath),
 };

// Programa la ejecución del script cada 5 segundos
// setInterval(checkForNewRecords, 5000);

// Crear el servidor http
 const secureServer = http.createServer(options, server);

// Sincronizar la base de datos y luego iniciar el servidor http
db_conn.sync({ alter: true }).then(() => {
  // secureServer.listen(PORT, () => {
    server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto http ${PORT}`);
  });
});
