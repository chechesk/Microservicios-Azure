const { client_error } = require('../utils/errors');
const { Country, City } = require('country-state-city');

function ensure_valid_country_city(country_code, city) {
  const country_exists = Country.getCountryByCode(country_code);

  if (!country_exists) {
    throw new client_error('The country does not exist', 404);
  }

  const cities_of_country = City.getCitiesOfCountry(country_code);
  const city_exists = cities_of_country.some(
    (city_info) => city_info.name === city
  );

  if (!city_exists) {
    throw new client_error(
      'The city does not exist in the selected country',
      404
    );
  }
}

module.exports = ensure_valid_country_city;
