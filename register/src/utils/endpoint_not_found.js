const endpoint_not_found = (req, res) => {
  res.status(404).send('Not found');
};

module.exports = endpoint_not_found;
