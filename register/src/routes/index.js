const { Router } = require('express');
const controllers = require('../controllers');
const hash_password = require('../middlewares/hash_password');
const validate = require('../middlewares/validators');
const risk_profile_validator = require('../middlewares/validators/risk_profile_validator');
const router = Router();

// ruta para registrar un customer
router.post(
  '/:model',
  [validate.create_customer, hash_password],
  controllers.register_record
);
// ruta para validar cuenta
router.post(
  '/validate/:model',
  [validate.validate_account],
  controllers.validate_record_account
);

// ruta para registrar kyc form
router.post('/:model/Kyc'/* , [validate.kyc_form] */, controllers.kyc_register);

router.post(
  '/:model/RiskProfile',
  /* [risk_profile_validator], */
  controllers.register_risk_profile
);
router.post('/:model/resend_email', controllers.resend_email)

//ruta para enviar el mensaje del usuario
router.post('/:model/send_message', controllers.contact_form)

module.exports = router;
