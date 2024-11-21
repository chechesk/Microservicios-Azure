const { create_hashed_password } = require('../utils');

const hash_passwowrd = async (req, res, next) => {
  const { password } = req.body;

  // si es una validacion entonces valida verification
  if (req.body.verification_code) {
    const hashed_verification_code = await create_hashed_password(
      verification_code
    );
    req.body.verification_code = hashed_verification_code;
  }
  const hashed_password = await create_hashed_password(password);

  req.body.password = hashed_password;
  next();
};

module.exports = hash_passwowrd;
