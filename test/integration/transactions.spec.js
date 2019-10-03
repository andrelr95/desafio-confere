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
let idDocument;

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
            number: '5242248646246746',
            expiry: '02/21',
            cvv: '432',
            holder: 'Tal de Ferreira'
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          expect(body).to.contain.property('_id');
          expect(body.card.number).to.equal('6746');
          idDocument = body._id;
          expect(status).to.equal(201);
          done();
        });
    }
  );

  mocha.it(
    'Integration - calls POST "/transactions" with invalid card number and handle error',
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
            number: '5200555500001234',
            expiry: '02/21',
            cvv: '432',
            holder: 'Tal de Ferreira'
          }
        })
        .end((err, res) => {
          const { body, status } = res;
          expect(body).to.contain.property('error');
          expect(body.error.code).to.equal(400);
          expect(status).to.equal(400);
          done();
        });
    }
  );

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
    'Integration - calls GET "/transactions/:id" and retrieve a single data from ID',
    done => {
      chai
        .request(app)
        .get(`${basePath}/transactions/${idDocument.toString()}`)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          expect(body).be.an('object');
          done();
        });
    }
  );
});
