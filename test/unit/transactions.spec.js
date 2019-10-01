const mocha = require('mocha');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const chai = require('chai');
const mongoose = require('mongoose');
const Transaction = require('../../src/models/transaction');
// const TransactionMock = require('../../src/models/transaction');
const transactionJson = require('../fixtures/transactions');
const chaiHttp = require('chai-http');
const app = require('./../../server');
const sinon = require('sinon');

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
  // TransactionMock.find = async () => transactionJson;
});

mocha.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

mocha.describe('Tests for Transaction Model', () => {
  mocha.describe('Unit tests for mongoose model "Transaction"', () => {
    mocha.it('exists', async () => {
      const modelName = Transaction.modelName;
      expect(modelName).to.equal('Transaction');
    });

    mocha.it('inserts into database and deletes', async () => {
      let count;
      count = await Transaction.countDocuments();
      expect(count).to.equal(5); //already initiated with 5 documents
      const result = await Transaction.create({
        value: 100.0,
        description: 'Teste',
        type: 'debit',
        installments: null,
        card: {
          number: '5200555500000000',
          expiry: '08/21',
          cvv: '333',
          holder: 'Fulano de talos'
        }
      });
      count = await Transaction.countDocuments();
      expect(result).to.contain.property('_id');
      expect(count).to.equal(6);
      const deleted = await Transaction.findByIdAndDelete(result._id);
      count = await Transaction.countDocuments();
      expect(deleted).to.contain.property('_id');
      expect(count).to.equal(5);
    });

    mocha.it('retrieves data from database', async () => {
      const data = await Transaction.find();
      expect(data).to.length(5);
    });
  });

  mocha.describe('Unit tests for "/transactions" resource', () => {
    mocha.it('calls GET /transactions and receives its data', done => {
      sinon.stub(Transaction, 'find').callsFake(() => {
        return transactionJson;
      });

      chai
        .request(app)
        .get('/transactions')
        .end((err, res) => {
          const { body, status } = res;
          console.log(body);
          expect(status).to.equal(200);
          expect(body).to.length(5);
          done();
        });
    });
  });
});
