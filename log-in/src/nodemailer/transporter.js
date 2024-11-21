const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
  host: env.GMAIL_HOST,
  port: env.GMAIL_PORT,
  secure: false,
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_PASS,
  },
});

module.exports = transporter;
