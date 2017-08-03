
'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const Band = require('../model/band.js');
const url = 'http://localhost:3000';
require('../server.js');

let testingBand = {
  name: 'Led Zeppelin',
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
      request.post('localhost:3000/api/band')
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
  describe('GET: /api/band', function() {
    before(done => {
      Band.create(testingBand)
      .then(band => {
        this.tempBand = band;
        done();
      })
      .catch(err => done(err));
    });
    after(done => {
      Band.remove({})
      .then(() => done())
      .catch(err => done(err));
    });
    it('should get a band back.', done => {
      request.get(`localhost:3000/api/band/${this.tempBand._id}`, (err, res) => {
        if(err) throw new Error(err);
        expect(res.status).to.equal(200);
        expect(res.body._id).to.be.equal(this.tempBand._id.toString());
        expect(res.body.name).to.equal(this.tempBand.name);
        expect(res.body.genre).to.equal(this.tempBand.genre);
        expect(res.body.hometown).to.equal(this.tempBand.hometown);
        done();
      });
    });
  });
});