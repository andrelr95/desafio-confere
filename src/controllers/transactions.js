const Transaction = require('../models/transaction');
const utils = require('../utils/validate-card');
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
  body = {
    ...body,
    card: {
      ...body.card,
      number: cardNumber.lastNumbers
    }
  };
  try {
    const result = await Transaction.create(body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500);
  }
};
