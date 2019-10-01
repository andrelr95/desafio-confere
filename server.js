const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./src/models/transaction');
const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(
  'mongodb+srv://andrelr:andrelr@study-database-pmddb.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

app.use(cors());

app.get('/status', (req, res) => {
  res.status(200);
  res.send({ status: 200, message: 'Ok' });
});

app.get('/transactions', async (req, res) => {
  const data = await Transaction.find();
  res.send(data).status(200);
});

app.listen(port, () => {
  console.log('App running at:', port);
});

module.exports = app;
