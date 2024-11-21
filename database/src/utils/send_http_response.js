const send_http_response = async (res, statusCode, data) => {
  res.status(statusCode).json({
    error: false,
    data,
  });
};

module.exports = send_http_response;
