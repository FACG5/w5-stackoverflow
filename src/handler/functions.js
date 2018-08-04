const path = require('path');
const read = require('./read.js');
const requestserver = require('./reqhttp');

const handelHomePage = (request, response) => {
  response.writeHead(200, { 'content-type': 'text/html' });

  read(path.join(__dirname, '..', '..', 'public', 'index.html'), (err, res) => {
    if (err) {
      response.end(err.message);
    } else {
      response.end(res);
    }
  });
};

const serverStaticFile = (request, response) => {
  const endponit = request.url;
  const extention = endponit.split('.')[1];
  const contenttype = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    jpg: 'image/jpg',
    png: 'image/png',
    json: 'application/json',
    gif: 'image/gif',
  };
  response.writeHead(200, {
    'content-type': contenttype[extention],
  });

  read(path.join(__dirname, '..', '..', endponit), (err, res) => {
    if (err) {
      response.end(err.message);
    } else response.end(res);
  });
};

const handelError = (response) => {
  response.writeHead(404, { 'content-type': 'text/html' });
  read(path.join(__dirname, '..', '..', 'public', 'errp.html'), (err, res) => {
    if (err) {
      response.end(err.message);
    } else response.end(res);
  });
};

const handelgetdata = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', () => {
    if (data) {
      const ops = {
        url: `https://api.stackexchange.com/2.2/questions?order=desc&sort=creation&site=stackoverflow&tagged=${data}`,
        method: 'GET',
        gzip: true,
      };
      requestserver(ops, (err, res, body) => {
        if (err) {
          response.end(err.message);
        } else if (body.items.length !== 0) {
          const finalData = { err: null, results: JSON.stringify(body) };
          response.end(JSON.stringify(finalData));
        } else {
          response.end(
            JSON.stringify({ err: '"Choose Lang!"', results: null }),
          );
        }
      });
    } else {
      response.end(JSON.stringify({ err: '"Choose Lang!"', results: null }));
    }
  });
};

module.exports = {
  handelHomePage,
  serverStaticFile,
  handelError,
  handelgetdata,
};
