'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Bakery = require('../model/bakery.js');
const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleBakery = {
  name: 'test bakery name'
};

describe('Bakery Routes', function() {
  describe('POST: /api/bakery', function() {
    describe('with a valid req body', function() {

      after( done => {
        if (this.tempBakery) {
          Bakery.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a list', done => {
        request.post(`${url}/api/bakery`)
        .send(exampleBakery)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test bakery name');
          this.tempBakery = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/bakery/:id', function() {
    describe('with a valid body', function() {

      before( done => {
        exampleBakery.timestamp = new Date();
        new Bakery(exampleBakery).save()
        .then( bakery => {
          this.tempBakery = bakery;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleBakery.timestamp;
        if (this.tempBakery) {
          Bakery.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a bakery', done => {
        request.get(`${url}/api/bakery/${this.tempBakery._id}`)
        .end((err, res) => {

          console.log('this:', this.tempBakery);
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test bakery name');
          done();
        });
      });
    });
  });
});