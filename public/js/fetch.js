const feachApi = (value, method, url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const obj = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        if (obj.err) {
          cb(new TypeError(obj.err));
        } else {
          cb(null, JSON.parse(obj.results));
        }
      } else {
        cb(new TypeError(obj.err));
      }
    }
  };
  xhr.open(method, url);
  xhr.send(value);
};
