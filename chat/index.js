// const http = require('https');
// const path = require('path');
// const fs = require('fs');
const server = require('./src/server');

const PORT = 7004;

// Rutas a los archivos generados por ssh-keygen
// const keyPath = path.resolve(__dirname, 'src', 'certificate', 'privkey1.pem');
// const certPath = path.resolve(__dirname, 'src', 'certificate', 'cert1.pem');

// Cargar el certificado PEM
// const options = {
//   key: fs.readFileSync(keyPath),
//   cert: fs.readFileSync(certPath),
// };

// Crear el servidor http
// const secureServer = http.createServer(options, server);

// Escuchar en el puerto http
// secureServer.listen(PORT, () => {
  // console.log(`Chat running on https port ${PORT}`);
// });
// Escuchar en el HTTP
 server.listen(PORT, () => {
  console.log(`Chat running on http port ${PORT}`);
 });