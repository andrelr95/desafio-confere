const mocha = require('mocha');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const chai = require('chai');
const mongoose = require('mongoose');
const Transaction = require('../../src/models/transaction');
const transactionJson = require('../fixtures/transactions');

const opts = { useNewUrlParser: true, useUnifiedTopology: true };
const expect = chai.expect;
let mongoServer;

// const chaiHttp = require('chai-http');
// const app = require('../server.js');
// chai.use(chaiHttp);

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

mocha.describe('Tests for Transaction Model', () => {
  mocha.describe('Models - mongoose', () => {
    mocha.it('exists', async () => {
      const modelName = Transaction.modelName;
      expect(modelName).to.equal('Transaction');
    });

    mocha.it('inserts into database', async () => {
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
    });
  });
});

// mocha.describe('This is all the transactions resource basic tests', () => {
//   mocha.it('"/transactions" endpoint should exist', () => {
//     var result = 4;
//     expect(result).to.equal(5);
//     chai
//       .request(app)
//       .get('/transactions')
//       .end((err, res) => {
//         expect(res.status, 'Status code').to.equal(200);
//       });
//     done();
//   });
// });
