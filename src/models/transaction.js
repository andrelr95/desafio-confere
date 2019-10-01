const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  value: Number,
  description: String,
  type: {
    type: String,
    enum: ['debit', 'credit', 'installment_credit']
  },
  installments: Number,
  card: {
    number: String,
    expiry: String,
    ccv: String,
    holder: String
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
