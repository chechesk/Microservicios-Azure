const { create_hashed_password } = require('../utils');

// Función asincrónica para hashear campos sensibles de un objeto.
const hash_sensitive_fields = async (data_object) => {
  const hashed_fields = {};

  // Recorre todas las propiedades del objeto de entrada.
  for (const key in data_object) {
    // Verifica que la propiedad sea propia del objeto (no heredada).
    if (data_object.hasOwnProperty(key)) {
      // Obtiene el valor original de la propiedad.
      const originalValue = data_object[key];

      // Aplica el hasheo al valor original y almacena el valor hasheado en el objeto de campos hasheados.
      const hashedValue = await create_hashed_password(originalValue);
      hashed_fields[key] = hashedValue;
    }
  }

  // Retorna un objeto con las mismas propiedades pero con los valores hasheados.
  return hashed_fields;
};

module.exports = hash_sensitive_fields;
