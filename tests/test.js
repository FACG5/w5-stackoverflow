const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router.js');

// trivial test
test('Initialise', (t) => {
  let num = 2
  t.equal(num, 2, 'Should return 2');
  t.end();
})

// Home Route test
test('Home route returns a status code of 200', (t) => {
    supertest(router)
        .get("/")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            t.error(err);
            t.equal(res.statusCode, 200, 'Should return 200');
            t.end();
        });
});

test('Erorr page status code', (t) => {
  supertest(router)
  .get('/search')
  .expect(404)
  .expect('Content-Type', /html/)
  .end((err, res) => {
    t.error(err)
    t.equal(res.statusCode, 404, 'response should return 404')
    t.end()
  })
})

// test('test for POST statusCode', (t) => {
//     supertest(router)
//         .post("search")
//         .send("java")
//         .expect(200)
//         .expect('Content-Type', /html/)
//         .end((err, res) => {
//             t.error(err)
//             t.equal(res.statusCode, 200, 'response should return 200');
//             t.end();
//         });
// });
