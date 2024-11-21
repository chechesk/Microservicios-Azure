const express = require('express');
const morgan = require('morgan');
const server = express();
const cors = require('cors');
const routes = require('./routes');
const { error_handler } = require('./utils/errors');
const { endpoint_not_found } = require('./utils');

server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Authorization',
  }));
server.use(morgan('dev'));
server.use(express.json());


server.use('/register', routes);
server.use('*',endpoint_not_found);

server.use(error_handler);

module.exports = server;
