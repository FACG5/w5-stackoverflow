const feachApi = function(value, method, url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var obj = JSON.parse(xhr.responseText);
        cb(obj);
      }
    }
    xhr.open(method, url);
    xhr.send(value);
  }