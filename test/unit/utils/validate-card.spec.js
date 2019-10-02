const mocha = require('mocha');
const valid = require('card-validator');
const chai = require('chai');
const utils = require('../../../src/utils/validate-card');

const expect = chai.expect;

mocha.describe('Unit - Credit card validator', () => {
  mocha.it('Unit - validates simple credit card number', () => {
    const number = '4532642834180166';
    const result = valid.number(number);
    expect(result.isValid).to.be.true;
  });

  mocha.it(
    'Unit - validate credit card and return the last 4 digits - 5128517639824944',
    () => {
      const number = '5128517639824944';
      const result = utils.extractCardLastNumbers(number);
      expect(result).to.be.a('object');
      expect(result).to.contain.property('isValid');
      expect(result).to.contain.property('lastNumbers');
      expect(result.lastNumbers).to.equal('4944');
    }
  );

  mocha.it(
    'Unit - validate another credit card and return the last 4 digits - 4716071529401208',
    () => {
      const number = '4716071529401208';
      const result = utils.extractCardLastNumbers(number);
      expect(result).to.be.a('object');
      expect(result).to.contain.property('isValid');
      expect(result).to.contain.property('lastNumbers');
      expect(result.lastNumbers).to.equal('1208');
    }
  );

  mocha.it(
    'Unit - validate another credit card and return the last 4 digits - 344059452973135',
    () => {
      const number = '344059452973135';
      const result = utils.extractCardLastNumbers(number);
      expect(result).to.be.a('object');
      expect(result).to.contain.property('isValid');
      expect(result).to.contain.property('lastNumbers');
      expect(result.lastNumbers).to.equal('3135');
    }
  );

  mocha.it(
    'Unit - validate another credit card and with an invalid number - 344059452971234',
    () => {
      const number = '344059452971234';
      const result = utils.extractCardLastNumbers(number);
      expect(result).to.be.a('object');
      expect(result).to.contain.property('isValid');
      expect(result).to.contain.property('lastNumbers');
      expect(result.lastNumbers).to.be.null;
      expect(result.isValid).to.be.false;
    }
  );
});
