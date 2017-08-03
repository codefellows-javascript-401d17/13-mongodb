'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Pokemon = require('../model/pokemon.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.Promise = Promise;
require('../server.js');

const url = `http://localhost:${PORT}`;
const examplePokemon = {
  name: 'test name',
  type: 'test type'
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
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test pokemon name');
          expect(res.body.origin).to.equal('test pokemon type');
          this.tempPokemon = res.body;
          done();
        });
      });

      it('should return 400 bad request', done => {
        request.post(`${url}/api/pokemon`)
        .send({ name: 'agumon', type: 'digimon'})
        .end((err, res) => {
          console.log('res text:', res.text);
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });
  });

  describe('GET: /api/pokemon/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Pokemon(examplePokemon).save()
        .then( pokemon => {
          this.tempPokemon = pokemon;
          done();
        })
        .catch(done);
      });

      after( done => {
        if(this.tempPokemon) {
          Pokemon.remove({})
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a pokemon', done => {
        request.get(`${url}/api/pokemon/${this.tempPokemon._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test pokemon name');
          expect(res.body.origin).to.equal('test pokemon type');
          done();
        });
      });

      it('should return 404 not found', done => {
        request.get(`${url}/api/pokemon/12345`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });
  });

  describe('PUT: /api/pokemon', function() {
    before(done => {
      Pokemon.create(examplePokemon)
      .then(pokemon => {
        this.testPokemon = pokemon;
        done();
      })
      .catch(err => done(err));
    });

    after(done => {
      Pokemon.remove({})
      .then( () => done())
      .catch(err => done(err));
    });

    it('should return a pokemon', done => {
      request.put(`${url}/api/pokemon/${this.testPokemon._id}`)
      .send({ name: 'new name', type: 'new type'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('new name');
        expect(res.body.origin).to.equal('new type');
        done();
      });
    });

    it('should return 400 bad request', done => {
      request.put(`${url}/api/pokemon/${this.testPokemon._id}`)
      .end((err, res) => {
        console.log('res text:', res.text);
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });

    it('should return 404 not found', done => {
      request.put(`${url}/api/pokemon/123456789`)
      .send({ name: 'new name', type: 'new type'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });
  });
});