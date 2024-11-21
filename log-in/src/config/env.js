require('dotenv').config();
const env = process.env;

module.exports = {
  GMAIL_HOST: env.GMAIL_HOST,
  GMAIL_USER: env.GMAIL_USER,
  GMAIL_PASS: env.GMAIL_PASS,
  GMAIL_PORT: env.GMAIL_PORT,
};
