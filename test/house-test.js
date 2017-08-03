'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const House = require('../model/house.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.Promise = Promise;
require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleHouse = {
  name: 'hodor'
};

describe('House Routes', function() {
  describe('POST: /api/house', function() {
    describe('with a valid req body', function() {
      after(done => {
        if(this.tempHouse) {
          House.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a house', done => {
        request.post(`${url}/api/house`)
        .send(exampleHouse)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('hodor');
          this.tempHouse = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/house/:id', function() {
    describe('with a valid body', function() {
      before(done => {
        exampleHouse.timestamp = new Date();
        new House(exampleHouse).save()
        .then(house => {
          this.tempHouse = house;
          done();
        })
        .catch(done);
      });

      after(done => {
        delete exampleHouse.timestamp;
        if(this.tempHouse) {
          House.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a house', done => {
        request.get(`${url}/api/house/${this.tempHouse._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('hodor');
          done();
        });
      });
    });
  });
});
