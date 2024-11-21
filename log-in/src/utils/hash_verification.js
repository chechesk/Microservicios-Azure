const bcrypt = require('bcrypt');
const hash_verification = async (unhashed_data, hashed_data) => {
  const result = await bcrypt.compare(unhashed_data, hashed_data);

  if (result) {
    console.log('The hash matches the provided password');
    return result;
  } else {
    console.error('Verification Error: An issue occurred during verification');
    return result;
  }
};

module.exports = hash_verification;
