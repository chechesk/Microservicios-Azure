const express = require('express')
const path = require('path')
const { Router }= require('express');
const  authLogin = require('../controller/auth');
const  data_perfil = require('../controller/data_perfil');
const {recover_password_email,/* recover_password_sms, */ validate_code, create_portfolio, get_portfolio, uploadIMG, updateAvatar,get_insiders, editPortfolio} = require('../controller');
const { email_validator } = require('../middlewares/validator');
const { verifyToken } = require('../middlewares/validator/auth.middleware');
const updatePassword = require('../controller/updatePassword');
const updateDocuments = require('../controller/updateDocuments');
const uploadDni = require('../controller/uploadDni');




const router = Router();

router.post('/', authLogin);
// router.get("/google", (req, res) => res.send(req.user));
router.get('/perfil', data_perfil)
// ruta para subir el archivo del DNI al servidor a la carpeta documents
router.post('/perfil/uploadDni', uploadDni);
// Ruta para actualizar documents en el KYC despues de subir
router.patch('/perfil/dni', updateDocuments)
//cargar el archivo al servidor aL Momento de actualizar la imagen
router.post('/perfil/upload', uploadIMG);
//Actualizar Imagen de Perfil desde el panel de usuario devuelve el URL cargado anteriormente
router.patch('/perfil/avatar', updateAvatar)
// Actualizar contraseña desde el panel de Perfil
router.patch('/perfil/change-password', updatePassword)

// Configuración para servir archivos estáticos desde el directorio 'uploads'
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

//ruta para recuperar password por email
router.post('/recover_password_email',email_validator,recover_password_email)

//ruta para recuperar password por sms
//router.post('/recover_password_sms', recover_password_sms)

//ruta para validar el codigo enviado
router.post('/validate_code',validate_code)
//rutas del portfolio
router.patch('/portfolio', editPortfolio)
router.post('/portfolio', create_portfolio)
router.get('/portfolio', get_portfolio)
router.get('/insiders', get_insiders)
module.exports = router;
