'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Pokemon = require('../model/pokemon.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.Promise = Promise;
require('../server.js');

const url = `http://localhost:${PORT}`;

let tempPokemon;

const examplePokemon = {
  name: 'the pokemon name',
  type: 'the type',
  gen: 'the gen'
};

const newPokemon = {
  name: 'the pokemon name',
  type: 'the type',
  gen: 'the gen'
};

describe('Pokemon Routes', function() {
  describe('POST: /api/pokemon', function() {
    describe('with a valid req body', function() {
      after( done => {
        if(this.tempPokemon) {
          Pokemon.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a pokemon', done => {
        request.post(`${url}/api/pokemon`)
        .send(examplePokemon)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('the pokemon name');
          expect(res.body.type).to.equal('the type');
          expect(res.body.gen).to.equal('the gen');
          this.tempPokemon = res.body;
          done();
        });
      });
    });

    describe('with an invalid request', function() {
      it('should return 400', done => {
        request.post(`${url}/api/pokemon`)
        .send()
        .end((err,res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/pokemon/:id', function() {
    describe('with a valid body', function() {
      before(done => {
        examplePokemon.timestamp = new Date();
        new Pokemon(examplePokemon).save()
        .then(pokemon => {
          this.tempPokemon = pokemon;
          done();
        })
        .catch(done);
      });

      after(done => {
        delete examplePokemon.timestamp;
        if(this.tempPokemon) {
          Pokemon.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a pokemon', done => {
        request.get(`${url}/api/pokemon/${this.tempPokemon._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('the pokemon name');
          expect(res.body.type).to.equal('the type');
          expect(res.body.gen).to.equal('the gen');
          done();
        });
      });
    });

    describe('with an invalid request', function(){
      it('should return 404', done => {
        request.get(`${url}/api/pokemon/1236795`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('testing PUT /api/pokemon', () => {
    before(done => {
      examplePokemon.timestamp = new Date();
      new Pokemon(examplePokemon).save()
      .then(pokemon => {
        this.tempPokemon = pokemon;
        done();
      })
      .catch(done);
    });

    after(done => {
      delete examplePokemon.timestamp;
      if (this.tempPokemon) {
        Pokemon.remove({})
        .then(() => done())
        .catch(done);
        return;
      }
      done();
    });
    it('should respond with a 200 status code and an updated pokemon object.', () => {
      console.log(this.tempPokemon._id);
      return request.put(`${url}/api/pokemon/${this.tempPokemon._id}`)
      .send(newPokemon)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('the pokemon name');
        expect(res.body.type).to.equal('the type');
        expect(res.body.gen).to.equal('the gen');
        tempPokemon = res.body;
      });
    });
  });

  it('should respond with a 400 error code.', () => {
    return request.post(`${url}/api/pokemon`)
    .send(tempPokemon)
    .then((res) => {
      tempPokemon = res.body;
      return request.put(`${url}/api/pokemon/${this.tempPokemon._id}`)
      .send(null);
    })
    .catch(err => {
      expect(err.status).to.equal(400);
    });
  });

  it('should respond with a 404 error code if an ID is not found.', () => {
    return request.get(`${url}/api/pokemon/12345`)
    .catch(err => {
      expect(err.status).to.equal(404);
    });
  });
});