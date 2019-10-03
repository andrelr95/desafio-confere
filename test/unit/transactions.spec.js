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

const basePath = `/api/v1`; //<- To be /${BASE_PATH}/${VERSION}

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
      // await Transaction.insertMany(transactionJson);
      done();
    });
  // TransactionMock.find = async () => transactionJson;
});

mocha.beforeEach(done => {
  Transaction.remove({}).then(async () => {
    await Transaction.insertMany(transactionJson);
  });
  done();
});

mocha.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

mocha.describe('Unit tests for Transaction', () => {
  mocha.describe('Unit - Mongoose - Model', () => {
    mocha.it('Unit - exists', async () => {
      const modelName = Transaction.modelName;
      expect(modelName).to.equal('Transaction');
    });

    mocha.it('Unit - retrieves data from database', async () => {
      const data = await Transaction.find();
      expect(data).to.length(5);
    });
  });
  mocha.describe('Unit APP - "/transactions" resource', () => {
    mocha.it('Unit - calls GET "/transactions" and receives its data', done => {
      sinon.stub(Transaction, 'find').callsFake(() => {
        return transactionJson;
      });
      chai
        .request(app)
        .get(`${basePath}/transactions`)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          expect(body).to.length(5);
          done();
        });
    });

    mocha.it(
      'Unit - calls POST "/transactions" and saves data correclty',
      done => {
        sinon.stub(Transaction, 'create').callsFake(() => {
          return {
            card: {
              number: '6746',
              expiry: '02/21',
              cvv: '432',
              holder: 'Tal de Ferreira'
            },
            _id: '5d94b7ded125030d30925750',
            value: 999,
            description: 'Item do teste do POST',
            type: 'debit',
            installments: null,
            __v: 0
          };
        });
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
            expect(res.status).to.equal(201);
            expect(res.body).to.contain.property('_id');
            expect(res.body.card.number).to.have.length(4);
            expect(res.body.card.number).to.equal('6746');
            done();
          });
      }
    );

    mocha.it(
      'Unit - calls GET "/transactions/:id" and retrieve a single data from ID',
      done => {
        sinon.stub(Transaction, 'findById').callsFake(() => {
          return {
            card: {
              number: '5200555500005555',
              expiry: '02/21',
              cvv: '432',
              holder: 'Tal de Ferreira'
            },
            _id: '5d94b7ded125030d30925750',
            value: 999,
            description: 'Item do teste do POST',
            type: 'debit',
            installments: null,
            __v: 0
          };
        });
        chai
          .request(app)
          .get(`${basePath}/transactions/5d94b7ded125030d30925750`)
          .end((err, res) => {
            if (err) done(err);
            const { body, status } = res;
            expect(status).to.equal(200);
            expect(body).to.be.a('object');
            expect(body).to.contain.property('_id');
            done();
          });
      }
    );
  });
});
