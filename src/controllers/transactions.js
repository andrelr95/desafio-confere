const Transaction = require('../models/transaction');

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
  const { body } = req;
  const result = await Transaction.create(body);
  res.status(201).send(result);
};
