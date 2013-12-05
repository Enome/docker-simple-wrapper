var http = require('http');

var docker = function (options, callback) {

  var response;
  var body = '';
  var error = '';

  options.socketPath = '/var/run/docker.sock';

  var req = http.request(options, function (res) {

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      body += chunk;
    });

    if (options.stream) {
      res.pipe(process.stdout);
    }

    response = res;

  });

  req.on('error', function (e) {
    error = e.message;
  });

  req.on('close', function () {
    callback(error, response, body);
  });

  if (options.stream) {

    options.stream.pipe(req); 

    options.stream.on('close', function () {
      req.end();  
    });

    return;

  } 

  if (options.body) {
    req.write(JSON.stringify(options.body), 'utf8');
  }

  req.end();

};

module.exports = docker;
