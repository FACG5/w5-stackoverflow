const request = require('request');

const requestserver = (Options, cb) => {
  request(Options, (error, response, body) => {
    if (error) {
      cb(new TypeError('Error'));
    } else {
      cb(null, response, JSON.parse(body));
    }
  });
};

module.exports = requestserver;
