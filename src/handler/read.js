const fs = require('fs');

const read = (path2, cb) => {
  fs.readFile(path2, (err, file) => {
    if (err) {
      cb(new TypeError('Error in the path'));
    } else {
      cb(null, file);
    }
  });
};
module.exports = read;