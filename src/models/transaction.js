const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  value: {
    type: Number,
    required: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['debit', 'credit', 'installment_credit']
  },
  installments: {
    type: Number
  },
  card: {
    number: {
      type: String,
      required: true
    },
    expiry: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    },
    holder: {
      type: String,
      required: true
    }
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
