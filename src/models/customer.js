const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
  available: {
    type: Number,
    required: false,
    default: 0
  },
  expected: {
    type: Number,
    required: false,
    default: 0
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
