const { Router }= require('express');
const { get_chat, create_chat, update_chat, login_start_chat, reporte, inversion_anual, create_risk_score, intrinsic_value, intrinsic_stock, avatar_chat } = require('../controller');
const { verifyToken } = require('../middlewares/validator/auth.middleware');

const router = Router();
//rutas para el chat gpt
router.get('/', get_chat)
router.post('/', create_chat)
router.patch('/', update_chat)

//ruta para iniciar el chat desde login
router.post('/start_chat',login_start_chat)

router.post('/reporte',reporte);

//ruta para inversion anual
router.post('/inversionAnual',inversion_anual)

//ruta para  risk score
router.post('/riskScore',create_risk_score)

//ruta intrinsic_value
router.post('/intrinsicValue',intrinsic_value)

//ruta intrinsic_stock
router.post('/intrinsicStock',intrinsic_stock)

router.post('/avatar_chat', avatar_chat)
module.exports = router;