const transactionRepository = require('../repositories/transaction');
const Transaction = require('../models/transaction');
const utils = require('../utils/validate-card');
const taxRules = require('../utils/taxes-rules');
const dayjs = require('dayjs');
const errorFactory = require('../utils/error-factory');

exports.getAllTransactions = async (req, res) => {
  const data = await Transaction.find();
  res.send(data).status(200);
};

exports.getTransactionById = async (req, res) => {
  const { params } = req;
  const data = await Transaction.findById(params.id);
  res.status(200).send(data);
};

exports.saveTransaction = async (req, res) => {
  let { body } = req;
  const cardNumber = utils.extractCardLastNumbers(body.card.number);

  if (!cardNumber.isValid) {
    res.status(400).send(errorFactory.badRequest('Cartão inválido'));
  }

  const value = taxRules.calculateFee(body);

  body = {
    ...body,
    value,
    card: {
      ...body.card,
      number: cardNumber.lastNumbers
    }
  };

  const result = await transactionRepository.insert(body);

  try {
    let finantials = [];

    if (body.installments) {
      for (let i = 1; i <= body.installments; i++) {
        finantials.push({
          status: 'expected',
          receivedDate: dayjs()
            .add(30 * i, 'day')
            .format('DD/MM/YYYY'),
          transaction: result._id,
          customer: result.customer._id
        });
      }
    } else {
      finantials.push({
        status: 'received',
        receivedDate: dayjs().format('DD/MM/YYYY'),
        transaction: result._id,
        customer: result.customer._id
      });
    }

    console.log(body);

    res.status(201).send(result);
  } catch (err) {
    res.status(500);
  }
};

// createFinancial() {

// }

// console.log(
//   'INDEX: ',
//   i,
//   dayjs()
//     .add(30 * i, 'day')
//     .format('DD/MM/YYYY')
// );
