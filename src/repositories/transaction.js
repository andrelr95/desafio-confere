const Transaction = require('../models/transaction');
const errorFactory = require('../utils/error-factory');
exports.insert = async (body) => {
  let result;
  try {
    result = await Transaction.create(body);  
  } catch(err) {
    result = errorFactory.internalServerError('Erro ao salvar na base de dados.', err);
  }
  return result
}