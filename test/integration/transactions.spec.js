const mocha = require('mocha');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const chai = require('chai');
const mongoose = require('mongoose');
const Transaction = require('../../src/models/transaction');
const transactionJson = require('../fixtures/transactions');
const chaiHttp = require('chai-http');
const app = require('./../../server');

const opts = { useNewUrlParser: true, useUnifiedTopology: true };
const expect = chai.expect;
let mongoServer;

chai.use(chaiHttp);

mocha.before(done => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then(mongoUri => {
      return mongoose.connect(mongoUri, opts, err => {
        if (err) done(err);
      });
    })
    .then(async () => {
      await Transaction.insertMany(transactionJson);
      done();
    });
});

mocha.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

mocha.describe('Unit tests for "/transactions" resource', () => {
  mocha.it('calls GET /transactions and receives its data', done => {
    chai
      .request(app)
      .get('/transactions')
      .end((err, res) => {
        const { body, status } = res;
        expect(status).to.equal(200);
        expect(body).to.length(5);
        done();
      });
  });
});
