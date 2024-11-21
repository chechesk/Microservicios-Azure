require('dotenv').config();
const env = process.env;

module.exports = {
  DB_HOST: env.PGHOST,
  DB_USER: env.PGUSER,
  DB_PASSWORD: env.PGPASSWORD,
  DB_NAME: env.PGDBNAME,
};
