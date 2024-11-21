const bcrypt = require('bcrypt');

const salt_rounds = 10;

// Función asincrónica para cifrar una contraseña utilizando la biblioteca 'bcrypt'.
// Recibe la contraseña original como argumento.
// Genera una "sal" (salt) única para el cifrado y luego crea un hash de la contraseña
// utilizando la sal generada.
// Retorna el hash resultante de la contraseña cifrada.
const hash_password = async (password) => {
  // Genera una sal única utilizando el número de rondas definido previamente (salt_rounds).
  const salt = await bcrypt.genSalt(salt_rounds);

  // Crea un hash de la contraseña original utilizando la sal generada.
  const hash = await bcrypt.hash(password, salt);

  // Retorna el hash resultante de la contraseña cifrada.
  return hash;
};

module.exports = hash_password;
