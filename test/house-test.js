'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const House = require('../model/house.js');

require('../server.js');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const url = `http://localhost:${PORT}`;

const exampleHouse = {
  name: 'Atreides',
  seat: 'Caladan',
  region: 'Delta Pavonis',
  words: 'Fear is the Mind-Killer'
};

const updateHouse = {
  seat: 'Arrakeen',
  region: 'Arrakis',
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
          expect(res.body.name).to.equal('Atreides');
          expect(res.body.seat).to.equal('Caladan');
          expect(res.body.region).to.equal('Delta Pavonis');
          expect(res.body.words).to.equal('Fear is the Mind-Killer');
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
          expect(res.body.name).to.equal('Atreides');
          expect(res.body.seat).to.equal('Caladan');
          expect(res.body.region).to.equal('Delta Pavonis');
          expect(res.body.words).to.equal('Fear is the Mind-Killer');
          done();
        });
      });

      it('should return status 404', done => {
        request.get(`${url}/api/house/1234`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/house/:id', function() {
    before(done => {
      exampleHouse.timestamp = new Date();
      new House(exampleHouse).save()
      .then(house => {
        this.testHouse = house;
        done();
      })
      .catch(done);
    });

    after(done => {
      House.remove({})
      .then(() => done())
      .catch(done);
    });

    it('should return updated house', done => {
      console.log('testHouse id:', this.testHouse._id);
      request.put(`${url}/api/house/${this.testHouse._id}`)
      .send(updateHouse)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.seat).to.equal('Arrakeen');
        expect(res.body.region).to.equal('Arrakis');
        done();
      });
    });
  });
});
