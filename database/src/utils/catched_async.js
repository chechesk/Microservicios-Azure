/* 
Middleware para capturar errores en funciones asíncronas
Este middleware envuelve una función asíncrona (controller) y maneja los errores que puedan ocurrir en ella. */
const catched_async = (fn) => {
  return (req, res, next) => {
    /* Llama a la función asíncrona (handler) pasando la respuesta (res) como argumento
     y utiliza "catch" para manejar cualquier error que se produzca en la función. */
    fn(req, res).catch((error) => next(error));
  };
};

module.exports = catched_async;
