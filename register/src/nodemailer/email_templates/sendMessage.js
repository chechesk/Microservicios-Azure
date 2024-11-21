const { send_email } = require('../index');

const send_message = (name, email,message) => {
  const sender = `info@quantumdassets.com`
  const subject = `${name} Quiere contactarse.`;
  const html =`<div style ="width:50% display: flex flex-direction: column align-items: center padding:2px"><img style ="width:50% " src=https://res.cloudinary.com/deqbqghhq/image/upload/v1698839182/Azul_Fondo_Blanco_h6lqe6.png alt =logo Quantum /> <p style="font-size: 1.2rem font-weight: bold ">mensaje enviado por: ${email} </p> <p style="font-size: 16px"> ${message} </p> </div>`
  send_email(sender, subject, html);
};

module.exports = send_message;