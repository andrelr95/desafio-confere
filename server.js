const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const Transaction = require('./src/models/transaction');
const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(
  'mongodb+srv://andrelr:andrelr@study-database-pmddb.mongodb.net/desafio-confere?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

//Configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//healthcheck endpoint
app.get('/status', (req, res) => {
  res.status(200);
  res.send({ status: 200, message: 'Ok' });
});

//routes -> later to be /${BASE_PATH}/${VERSION}
app.use('/api/v1', require('./src/routes/transactions'));

//starting
app.listen(port, () => {
  console.log('App running at:', port);
});

module.exports = app;
