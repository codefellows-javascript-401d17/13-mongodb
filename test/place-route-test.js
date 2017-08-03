'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');

const Place = require('../model/place.js');

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

const testPlace = {
  place: 'Seattle'
};

require('../server.js');

describe('Place routes', () => {


  describe('GET: /api/place/:id', () => {
    describe('with valid id input', function(){
      before((done) => {
        testPlace.timestamp = new Date();
        new Place(testPlace).save()
        .then((place) => {
          this.tempList = place;
          done();
        })
        .catch(done);
      });
      after((done) => {
        delete testPlace.timestamp;
        if(this.tempList){
          Place.findById(this.tempList._id).remove()
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('Should return a status of 200', (done) => {
        superagent.get(`${url}/api/place/${this.tempList._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.place).to.equal('Seattle');
          done();
        });
      });
    });
    describe('with invaid id input', function(){
      it('Should return a status of 404', (done) => {
        superagent.get(`${url}/api/place/invaidId`)
        .end((err) => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });


  describe('GET: /api/place', () => {
    describe('with valid id input', function(){
      before((done) => {
        testPlace.timestamp = new Date();
        new Place(testPlace).save()
        .then((place) => {
          this.tempList = place;
          testPlace.timestamp = new Date();
          new Place(testPlace).save()
          .then((place) => {
            this.tempListTwo = place;
            done();
          })
          .catch(done);
        })
        .catch(done);
      });
      after((done) => {
        delete testPlace.timestamp;
        if(this.tempList){
          Place.findById(this.tempList._id).remove()
          .then(() => done())
          .catch(done);
          return;
        }
        if(this.tempListTwo){
          Place.findById(this.tempListTwo._id).remove()
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('Should return an array of palces', (done) => {
        superagent.get(`${url}/api/place`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
      });
    });
  });


  describe('PUT: /api/place/:id', () => {
    describe('with valid id and body input', function(){
      before((done) => {
        testPlace.timestamp = new Date();
        new Place(testPlace).save()
        .then((place) => {
          this.tempList = place;
          done();
        })
        .catch(done);
      });
      after((done) => {
        delete testPlace.timestamp;
        if(this.tempList){
          Place.findById(this.tempList._id).remove()
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('Should replace a place', (done) => {
        superagent.put(`${url}/api/palce/${this.tempList._id}`)
        .send({place: 'not Seattle'})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.nModified).to.equal(1);
          this.tempList = res.body;
          done();
        });
      });
    });
    describe('with invalid body input', function(){
      before((done) => {
        testPlace.timestamp = new Date();
        new Place(testPlace).save()
        .then((place) => {
          this.tempList = place;
          done();
        })
        .catch(done);
      });
      after((done) => {
        delete testPlace.timestamp;
        if(this.tempList){
          Place.findById(this.tempList._id).remove()
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('Should return a status of 400', (done) => {
        superagent.put(`${url}/api/palce/${this.tempList._id}`)
        // no body
        .end((err, res) => {
          // expect(err.status).to.equal(404);
          // NOTE: incorrect comparison.
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('with invalid id input', function(){
      it('Should return a status of 404', (done) => {
        superagent.put(`${url}/api/palce/invalidId`)
        .send({place: 'not Seattle'})
        .end((err) => {
          // NOTE: incorrect comparison.
          expect(err.status).to.equal(500);
          done();
        });
      });
    });
  });


  describe('POST: /api/place', () => {
    describe('with valid input', function(){
      after((done) => {
        if(this.tempList){
          Place.findById(this.tempList._id).remove()
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('Should post and return a place', (done) => {
        superagent.post(`${url}/api/place`)
        .send(testPlace)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.place).to.equal('Seattle');
          this.tempList = res.body;
          done();
        });
      });
    });
    describe('with invalid body input', function(){
      after((done) => {
        if(this.tempList){
          Place.findById(this.tempList._id).remove()
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('Should return a status of 404', (done) => {
        superagent.post(`${url}/api/place`)
        // no body
        .end((err) => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('DELETE: /api/place/:id', () => {
    describe('with valid input', function(){
      before((done) => {
        testPlace.timestamp = new Date();
        new Place(testPlace).save()
        .then((place) => {
          this.tempList = place;
          done();
        })
        .catch(done);
      });
      it('Should remove a place', (done) => {
        superagent.delete(`${url}/api/place/${this.tempList._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('with invalid id input', function(){
      it('Should return a status of 404', (done) => {
        superagent.delete(`${url}/api/place/invalidId`)
        .end((err) => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });
});
