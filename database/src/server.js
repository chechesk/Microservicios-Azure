const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes/index');
const { error_handler, endpoint_not_found } = require('./utils');

const server = express();

server.use(morgan('dev'));
server.use(express.json());

// Habilita CORS
server.use(cors(
  {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Authorization',  
  }
    ));

// proteccion contra ataques web
//server.use(helmet());

// enrutado
server.use(routes);

// manejo de error para endpoint no encontrado
server.use(endpoint_not_found);

// manejador de errores
server.use(error_handler);

module.exports = server;
