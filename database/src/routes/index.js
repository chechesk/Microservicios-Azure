const { Router } = require('express');
const { model_router } = require('../middlewares');
const controllers = require('../controllers');
const { verifyToken } = require('../middlewares/validator/auth.middleware');

const router = Router();

// esta ruta llega mediante /database/:model
router.get('/database/:model', model_router, controllers.search_records);

// esta ruta llega mediante /registration/:model
router.post('/:model', model_router, controllers.create_record);

// esta ruta llega mediante /registration/:model
router.patch('/:model', model_router, controllers.patch_record);

// esta ruta es para actualizar un campo
router.put('/:model', model_router, controllers.put_records)

//Router Mid Perfil
// router.post('/midLow', controllers.mid_perfil)

module.exports = router;
