const request = require("request");


const myRquest = (Options, cb) => {
  request(Options, (error, response, body) => {
    if (error) {
      
      cb(new TypeError("Error"));
    } else {      
      cb(null,response,JSON.parse (body));
    }
  });
};

module.exports = myRquest;
