const bcrypt = require('bcrypt');
const { client_error } = require('../utils/errors');

const compare_passwords = async (password, hashed_password) => {
  const match = await bcrypt.compare(password, hashed_password);
  console.log('MATCH ' + match);

  if (match) return match;
  else throw new client_error('Email or password is incorrect or invalid', 400);
};

module.exports = compare_passwords;
