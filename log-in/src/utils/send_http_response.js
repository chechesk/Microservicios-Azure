const send_http_response = async (res, result) => {
  const { status, data } = result;
  let new_message;

  if (data && data.data != null) {
    new_message = data.data;
  } else {
    new_message = data;
  }
  // el controlador debe enviar el resultado de la peticion axios para que funcione data.data y data.status
  res.status(status).json({
    error: false,
    message: new_message,
  });
};

module.exports = send_http_response;
