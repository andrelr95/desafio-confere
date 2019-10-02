const express = require('express');
const routes = express.Router();
const transactionController = require('../controllers/transactions');

routes.get('/transactions', transactionController.getAllTransactions);
routes.get('/transactions/:id', transactionController.getTransactionById);
routes.post('/transactions', transactionController.saveTransaction);

module.exports = routes;
