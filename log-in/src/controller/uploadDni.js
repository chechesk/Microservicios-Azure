const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'documents/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Utiliza uploadIMG.array en lugar de uploadIMG.single para permitir múltiples archivos
const uploadIMG = multer({ storage: storage });

module.exports = (req, res) => {
  // Cambia uploadIMG.single a uploadIMG.array para permitir varios archivos
  uploadIMG.array('image', 2)(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cargar los archivos.' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No se ha seleccionado ningún archivo.' });
    }

    const fileNames = req.files.map(file => file.filename);

    // Puedes hacer cualquier procesamiento adicional aquí

    // Devolver los nombres de los archivos como un array al frontend
    res.json({ fileNames });
  });
};
