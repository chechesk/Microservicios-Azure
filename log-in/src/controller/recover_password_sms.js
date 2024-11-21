/* const { USERNAME, API_KEY, NUMBER } = process.env;
const { Customer, Kyc } = require("../data");
const { create_random_code } = require('../utils');
const textmagicClient = require('textmagic-client');
const { puerto, url_database, ssl } = require('../../config/server');

const axios = require('axios')

module.exports = async (req, res) =>
{
  const { email } = req.body;
  let phone;

  //Busca el customer por email
  let customer = await Customer.serch_by_email(email);

  //si no encuentra customer lo envia a regitrarse
  if (!customer) return res.send('The customer does not exist, you must register')

  // verifica que customer este active si no es asi deveria enviarle el email nuevamnete
  if (customer.data.data.active === false) return res.send('your account must be verified')

  let kyc = await Kyc.serch_by_customer_id(customer.data.data.id)
  if (kyc) {
    phone = NUMBER // kyc.data[0].cellphone_number 

  }
  // How to install SDK see here https://docs.textmagic.com/#section/Node.js
  const client = textmagicClient.ApiClient.instance;
  const auth = client.authentications['BasicAuth'];
  const api = new textmagicClient.TextMagicApi();

  // put your Username and API Key from https://my.textmagic.com/online/api/rest-api/keys page.
  auth.username = USERNAME;
  auth.password = API_KEY;
  const { hashed, unhashed } = await create_random_code();

  api.sendMessage({
    'text': `YOUR VERIFICATION CODE IS : ${unhashed}`,
    'phones': phone
  }).then(function (data)
  {
    console.log(data.id);

  }).catch(function (err)
  {
    console.error(err);
  });
  //modifica el codigo de verificacion en la db
  let data = {
    ...customer.data.data,
    verification_code: hashed
  }
  axios.patch(`h${ssl}://${url_database}:${puerto}/Customer`, data);

  console.log(unhashed)
  res.json({ message: 'enviamos un sms' })
} */