const express = require('express');
const http = require('https');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const { createProxy } = require('./src/utils');
const cors = require('cors');

const PORT = 7000;

// Rutas a los archivos generados por ssh-keygen
const keyPath = path.resolve(__dirname, 'src', 'certificate', 'privkey1.pem');
const certPath = path.resolve(__dirname, 'src', 'certificate', 'cert1.pem');


const app = express();

// Cargar el certificado PEM
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

// Crear un servidor http
const secureServer = http.createServer(options, app);

app.use(cors(
  {origin: '*' ,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // allowedHeaders: 'Content-Type, Authorization',
}
));
app.use(morgan('dev'));

app.use('/database', createProxy('database', 7001));
app.use('/register', createProxy('register', 7002));
app.use('/login', createProxy('login', 7003));
app.use('/chat', createProxy('chat', 7004));

// Iniciar el servidor http
// secureServer.listen(PORT, () => {
   app.listen(PORT, () => {
  console.log(`Gateway running on HTTP port ${PORT}`);
});
