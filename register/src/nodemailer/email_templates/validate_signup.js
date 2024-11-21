const { send_email } = require('../index');

const validate_signup = (req, code) => {
  const { email } = req.body;
  const subject = 'Quantum | Código de confirmación';
  const html =`<div><img src=https://res.cloudinary.com/deqbqghhq/image/upload/v1698839182/Azul_Fondo_Blanco_h6lqe6.png alt =logo Quantum /> SU CODIGO DE CONFIRMACON ES: <b>${code}</b></div>`


  send_email(email, subject, html);
};

module.exports = validate_signup;
