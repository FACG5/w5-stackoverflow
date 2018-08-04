const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router.js');

test('Home route returns a status code of 200', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err) => {
      t.error(err);
      t.end();
    });
});

test('Erorr page status code', (t) => {
  supertest(router)
    .get('/search')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err) => {
      t.error(err);
      t.end();
    });
});


test('return', (t) => {
  supertest(router)
    .post('/search')
    .send('java') // to send a payload
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.equal(typeof res, 'object', 'should return  object');
      t.end();
    });
});

test('return', (t) => {
  supertest(router)
    .post('/search')
    .send('sadsd')
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.equal(typeof res, 'object', 'should return  object');
      t.end();
    });
});
