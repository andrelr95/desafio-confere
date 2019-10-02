const valid = require('card-validator');

exports.isValid = number => {
  const { isValid } = valid.number(number);
  return isValid;
};

exports.extractCardLastNumbers = number => {
  const isValid = this.isValid(number);
  if (isValid) {
    return {
      isValid,
      lastNumbers: number.substring(number.split('').length - 4)
    };
  } else {
    return {
      isValid,
      lastNumbers: null
    };
  }
};
