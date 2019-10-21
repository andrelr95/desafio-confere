// - 2,8% para transações feitas com cartão de débito

// - 3,2% para transações feitas com cartão de crédito à vista

// - 3.8% para transações feitas com cartão de crédito parcelado, sendo de 2 a 6 parcelas

// - 4.2% para transações feitas com cartão de crédito parcelado, sendo de 7 a 12 parcelas

const DEBIT_FEE = 0.028;
const CREDIT_FEE = 0.032;
const SMALL_CREDIT_FEE = 0.038;
const LARGE_CREDIT_FEE = 0.042;

exports.calculateFee = transaction => {
  const { installments, value, type } = transaction;

  if (type === 'debit') {
    return value - value * DEBIT_FEE;
  }

  if (type === 'credit') {
    if (installments === 1) {
      return value - value * CREDIT_FEE;
    } else if (installments < 7) {
      return value - value * SMALL_CREDIT_FEE;
    } else {
      return value - value * LARGE_CREDIT_FEE;
    }
  }
};
