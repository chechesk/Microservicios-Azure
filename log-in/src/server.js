const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
const routes = require('./routes');
// const passport = require ('passport');
const {endpoint_not_found, error_handler } = require('./utils/errors');


server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Authorization',
  }));
server.use(morgan('dev'));
server.use(express.json());
// server.use(passport.initialize());
// server.use(passport.session());

server.use('/login', routes);

server.use(endpoint_not_found);
server.use(error_handler);

module.exports = server;