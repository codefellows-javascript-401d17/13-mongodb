
'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const Band = require('../model/band.js');
const url = 'http://localhost:8000';

let testingBand = {
  name: 'Led Zeppeling',
  genre: 'Rock',
  hometown: 'London?'
}

describe('Band Test stuff', function() {

  describe('POST: /api/band/', function() {
    after(done => {
      Band.remove({})
        .then(() => done())
        .catch(err => done(err));
      return;
    });

    it('res should be a band.', done => {
      request.post('localhost:8000/api/band')
        .send(testingBand)
        .end((err, res) => {
          if(err) throw new Error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(testingBand.name);
          expect(res.body.genre).to.equal(testingBand.genre);
          expect(res.body.hometown).to.equal(testingBand.hometown);
          done();
        });
    });
  });  
});