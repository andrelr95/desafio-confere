var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;
var app = require('../server.js');

chai.use(chaiHttp);

describe('it runs the first test', () => {
  it('check the api health response', done => {
    chai
      .request(app)
      .get('/status')
      .end((err, res) => {
        console.log(res.body);
        assert(res.status === 200, 'Status code are equal to 200!');
        assert(res.body.message === 'Online', 'Message are good');
        assert.equal(res.status, 200, 'Status code are equal to 200!');
        assert.equal(
          res.body.message,
          'Online',
          'Status code are equal to 200!'
        );
        assert(res.body.message === 'Online', 'Message are good');
        expect(res.status, 'Status code').to.equal(200);
        expect(res.body.message, 'Response message').to.equal('Online');
      });
    done();
  });
});
