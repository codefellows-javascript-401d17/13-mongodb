const expect = require('chai').expect;
const request = require('superagent');
const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;
const Airport = require('../model/airport.js');


require('../server.js');
var exampleAirport;

describe('Airport Router', function () {
  describe('POST /api/airport', function () {
    after((done) => {
      if (this.tempAirport) {
        Airport.remove({})
          .then(() => done())
          .catch(done);
        return;
      }
      done();
    })
    it('saves airport document to collection', (done) => {
      request.post(`${url}/api/airport`)
        .send(exampleAirport)
        .end((err, rsp) => {
          if(err) return done(err);
          expect(rsp.status).to.equal(200);
          this.tempAirport = rsp.body;
          done();
        })
    })
  })
});