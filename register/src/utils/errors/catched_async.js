/* 
Middleware para capturar errores en funciones asíncronas.
Estos errores provienen generalmente de la DB vienen como err.response, el cual se como respuesta a una funcion axios
Este middleware envuelve una función asíncrona (controller) y maneja los errores que puedan ocurrir en ella. */
const catched_async = (fn) => {
  return (req, res, next) => {
    // Ejecuta la función asincrónica 'fn' pasándole 'req' y 'res',
    // y maneja cualquier error que se produzca durante la ejecución.
    fn(req, res)
      .then(() => {
        // Si no hay errores, continuamos
        next();
      })
      .catch((err) => {
        //console.error(err);
        if (err.response) {
          const message = err.response.data.message;
          const statusCode = err.response.status;
          const new_err = { statusCode, message };
          next(new_err);
        } else {
          next(err);
        }
      });
  };
};

module.exports = catched_async;
