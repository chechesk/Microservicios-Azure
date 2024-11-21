const { client_error } = require('../utils/errors');

const ensure_age_consistency = (age, birth_date) => {
  const today = new Date();
  const [year, month, day] = birth_date.split('-').map(Number);
  const birthYear = today.getFullYear() - age;

  if (birthYear === year) {
    if (
      today.getMonth() + 1 > month ||
      (today.getMonth() + 1 === month && today.getDate() >= day)
    ) {
      return;
    }
  }

  throw new client_error(
    'Date of birth is not consistent with the entered age',
    400
  );
};

module.exports = ensure_age_consistency;
