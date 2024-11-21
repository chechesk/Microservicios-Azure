const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadIMG = multer({ storage: storage });

module.exports = (req, res) => {
  uploadIMG.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cargar el archivo.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se ha seleccionado ningún archivo.' });
    }

    const fileName = req.file.filename;

    // Puedes hacer cualquier procesamiento adicional aquí

    // Devolver el nombre del archivo como un string al frontend
    res.json({ fileName });
  });
};
