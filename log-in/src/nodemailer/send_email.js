const { client_error } = require('../utils/errors');
const transporter = require('./transporter');
const { GMAIL_USER } = require('../config/env');

const send_email = (to, subject,html) => {
  const mail_options = {
    from: GMAIL_USER,
    to,
    subject,
    html
  };

  transporter.sendMail(mail_options, (err, info) => {
    if (err) {
      console.log('Error while trying to send the email');
      throw new client_error(
        'Error while trying to send the email: ' + err.message,
        400
      );
    } else {
      console.log('Email sent', info.response);
    }
  });
};

module.exports = send_email;
