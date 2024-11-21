const { models } = require('../database/db_config');
const { response } = require('../utils');

const post_record = async (req, res, next) => {
    // Aquí puedes ejecutar tu función de Python utilizando child_process
    exec('python ruta/a/tu/script.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar la función de Python: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`Resultado de la función de Python: ${stdout}`);
      res.send('Función de Python ejecutada correctamente.');
    });
  };
module.exports = post_record;
