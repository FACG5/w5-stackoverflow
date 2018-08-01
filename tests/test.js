const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router.js");

test("Initialise", t => {
  let num = 2;
  t.equal(num, 2, "Should return 2");
  t.end();
});

test("Home route returns a status code of 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});

test("Erorr page status code", t => {
  supertest(router)
    .get("/search")
    .expect(404)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, "response should return 404");
      t.end();
    });
});

test("Forbidden  ", t => {
  supertest(router)
    .post("/search")
    .expect(500)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 500, "Forbidden");
      t.end();
    });
});

test("return  ", t => {
  supertest(router)
    .post("/search")
    .send("java") // to send a payload
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.equal(typeof res, "object", "should return  object");
      t.end();
    });
});

test("return  ", t => {
  supertest(router)
    .post("/search")
    .send("dddddd")
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.equal(typeof res, "object", "should return  object");
      t.equal(res.statusCode, 200, "should return statusCode 200 ");
      t.end();
    });
});
