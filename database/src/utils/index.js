const catched_async = require('./catched_async');
const send_http_response = require('./send_http_response');
const error_handler = require('./error_handler');
const endpoint_not_found = require('./endpoint_not_found');

module.exports = {
  catched_async,
  response: send_http_response,
  error_handler,
  endpoint_not_found,
};
