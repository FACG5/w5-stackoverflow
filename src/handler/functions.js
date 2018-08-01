const read = require("./read.js");
const myRquest = require("./reqhttp");
const path = require("path");

const handelHomePage = (request, response) => {
  response.writeHead(200, {
    "content-type": "text/html"
  });

  read(path.join(__dirname, "..", "..", "public", "index.html"), (err, res) => {
    if (err) {
      response.end(err.message);
    } else response.end(res);
  });
};

const serverStaticFile = (request, response) => {
  let endponit = request.url;
  let extention = endponit.split(".")[1];
  let contenttype = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpg",
    png: "image/png",
    json: "application/json",
    gif: "image/gif"
  };
  response.writeHead(200, {
    "content-type": contenttype[extention]
  });

  read(path.join(__dirname, "..", "..", endponit), (err, res) => {
    if (err) {
      response.end(err.message);
    } else response.end(res);
  });
};

const handelError = response => {
  response.writeHead(404, { "content-type": "text/html" });
  read(path.join(__dirname, "..", "..", "public", "errp.html"), (err, res) => {
    if (err) {
      response.end(err.message);
    } else response.end(res);
  });
};

const handelgetdata = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });

  request.on("end", () => {
    if (data) {
      const ops = {
        url: `https://api.stackexchange.com/2.2/questions?order=desc&sort=creation&site=stackoverflow&tagged=${data}`,
        method: "GET",
        gzip: true
      };
      myRquest(ops, (err, res, body) => {
        if (err) {
          response.end(err.message);
        } else if (body) {
          response.end(JSON.stringify(body));
        }
      });
    } else {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("Forbidden");
    }
  });
};

module.exports = {
  handelHomePage,
  serverStaticFile,
  handelError,
  handelgetdata
};
