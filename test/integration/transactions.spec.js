const mocha = require('mocha');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const chai = require('chai');
const mongoose = require('mongoose');
const Transaction = require('../../src/models/transaction');
const transactionJson = require('../fixtures/transactions');
const chaiHttp = require('chai-http');
const app = require('./../../server');

const basePath = `/api/v1`; //<- To be /${BASE_PATH}/${VERSION}

const opts = { useNewUrlParser: true, useUnifiedTopology: true };
const expect = chai.expect;
let mongoServer;

chai.use(chaiHttp);

mocha.beforeEach(done => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then(mongoUri => {
      return mongoose.connect(mongoUri, opts, err => {
        if (err) done(err);
      });
    })
    .then(async () => {
      // await Transaction.insertMany(transactionJson);
      done();
    });
});

mocha.beforeEach(done => {
  Transaction.remove({});
  Transaction.insertMany(transactionJson);
  done();
});

mocha.afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

mocha.describe('Integration tests for Transaction', () => {
  mocha.it(
    'Integration - calls GET "/transactions" and receives its data',
    done => {
      chai
        .request(app)
        .get(`${basePath}/transactions`)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          expect(body).be.an('array');
          done();
        });
    }
  );

  mocha.it(
    'Integration - calls POST "/transactions" and saves data correctly',
    done => {
      chai
        .request(app)
        .post(`${basePath}/transactions`)
        .send({
          value: 999.0,
          description: 'Item do teste do POST',
          type: 'debit',
          installments: null,
          card: {
            number: '5200555500005555',
            expiry: '02/21',
            cvv: '432',
            holder: 'Tal de Ferreira'
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          // documentId = body._id;
          expect(body).to.contain.property('_id');
          expect(status).to.equal(201);
          done();
        });
    }
  );

  // mocha.it('calls GET "/transactions/:id" and retrieve the document by its ID', done => {
  //   // sinon.stub(Transaction, 'findById').callsFake(() => [])

  // })
});
