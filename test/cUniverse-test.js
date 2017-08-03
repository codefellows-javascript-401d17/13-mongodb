'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const CUniverse = require('../model/cUniverse.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.Promise = Promise;
require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleCUniverse = {
  superhero: 'test cUniverse superhero'
};

describe('CUniverse Routes', function() {
  describe('POST: /api/cUniverse', function() {
    describe('with a valid req body', function() {
      after( done => {
        if (this.tempCUniverse) {
          CUniverse.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a cUniverse', done => {
        request.post(`${url}/api/cUniverse`)
        .send(exampleCUniverse)
        .end((err, res) => {
          if (err) return done (err);
          expect(res.status).to.equal(200);
          expect(res.body.superhero).to.equal('test cUniverse superhero');
          this.tempCUniverse = res.body;
          done();
        });
      });
    });
  });

  describe('with an invalid req body', function() {
    after( done => {
      if (this.tempCUniverse) {
        CUniverse.remove({})
        .then( () => done())
        .catch(done);
        return;
      }
      done();
    });

    it('should respond with a bad request', done => {
      request.post(`${url}/api/cUniverse`)
      .send(null)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/cUniverse/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleCUniverse.timestamp = new Date();
        new CUniverse(exampleCUniverse).save()
        .then( cUniverse => {
          this.tempCUniverse = cUniverse;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleCUniverse.timestamp;
        if (this.tempCUniverse) {
          CUniverse.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a cUniverse', done => {
        request.get(`${url}/api/cUniverse/${this.tempCUniverse._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.superhero).to.equal('test cUniverse superhero');
          done();
        });
      });

      it('should respond with id not found', done => {
        request.get(`${url}/api/cUniverse/12345`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/cUniverse/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleCUniverse.timestamp = new Date();
        new CUniverse(exampleCUniverse).save()
        .then( cUniverse => {
          this.tempCUniverse = cUniverse;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleCUniverse.timestamp;
        if (this.tempCUniverse) {
          CUniverse.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a cUniverse with a updated body', done => {
        request.put(`${url}/api/cUniverse/${this.tempCUniverse._id}`)
        .send({
          superhero: 'superman'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.superhero).to.equal('superman');
          done();
        });
      });
    });

    describe('with an invalid body', function() {
      before( done => {
        exampleCUniverse.timestamp = new Date();
        new CUniverse(exampleCUniverse).save()
        .then( cUniverse => {
          this.tempCUniverse = cUniverse;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleCUniverse.timestamp;
        if (this.tempCUniverse) {
          CUniverse.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should respond with a bad request', done => {
        request.put(`${url}/api/cUniverse/${this.tempCUniverse._id}`)
        // .send(null)
        .end((err, res) => {
          console.log(res);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
