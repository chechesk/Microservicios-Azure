const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
const routes = require('./routes')
const { error_handler, endpoint_not_found } = require('./utils');

// Configura CORS para todas las rutas
server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Authorization',
  }));

server.use(morgan('dev'));
server.use(express.json());
server.use('/chat', routes);

// manejo de error para endpoint no encontrado
// server.use(endpoint_not_found);

// manejador de errores
// server.use(error_handler);


module.exports = server;