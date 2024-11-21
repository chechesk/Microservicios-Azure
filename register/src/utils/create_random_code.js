const crypto = require('crypto');
const create_hashed_password = require('../utils/create_hashed_password');

const create_random_code = async () => {
  const min = 100000; // El número mínimo de 6 dígitos (100000)
  const max = 999999; // El número máximo de 6 dígitos (999999)

  const code_buffer = crypto.randomBytes(3).readUIntBE(0, 3); // Genera 3 bytes de datos aleatorios (24 bits)
  const code_number = code_buffer.toString().padStart(6, 0); // Convierte a cadena de 6 dígitos
  const six_digit_code = (code_number % (max - min + 1)) + min; // Asegura que el código esté dentro del rango deseado

  // convierte el codigo a tipo string y obtiene la longitud del numero creado
  const length = six_digit_code.toString().length;

  // verifica para que siempre devuelva un numero con longitud de 6 digitos
  if (length === 6) {
    // crea el hash del codigo
    const random_code = {
      hashed: await create_hashed_password(six_digit_code.toString()),
      unhashed: six_digit_code.toString(),
    };

    // retorna el codigo haseheado
    return random_code;
  } else create_random_code();
};

module.exports = create_random_code;
