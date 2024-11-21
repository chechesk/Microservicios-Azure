const https = require('https');
const fs = require('fs');
const path = require('path');
const server = require('./src/server');

const PORT = 7003;

// Rutas a los archivos generados por ssh-keygen
const keyPath = path.resolve(__dirname, 'src', 'certificate', 'privkey1.pem');
const certPath = path.resolve(__dirname, 'src', 'certificate', 'cert1.pem');


// Cargar el certificado PEM
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

// Crear el servidor HTTPS
const secureServer = https.createServer(options, server);

// Escuchar en el puerto HTTPS
// secureServer.listen(PORT, () => {
  server.listen(PORT, () => {
  console.log(`User Log-in running on HTTPs port ${PORT}`);
});