var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require('../server.js');

chai.use(chaiHttp);

mocha.describe('it runs the first test', () => {
  mocha.it('check the api health response', () => {
    chai
      .request(app)
      .get('/status')
      .end((err, res) => {
        expect(res.status, 'Status code').to.equal(200);
        expect(res.body.message, 'Message content should be "Ok"').to.equal(
          'Ok'
        );
      });
  });
});
