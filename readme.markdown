# docker-simple-wrapper

## Install

```sh
npm install docker-simple-wrapper
```

## Basic

```js
var docker = require('docker-simple-wrapper');

var options = {
  method: 'POST',
  path: '/containers/' + state.name + '/stop',
};

docker(options, function (error, response, body) {

  if (error || response.statusCode !== 204 && response.statusCode !== 404) {
    return next(error || body); 
  }

  console.log(response, body);

});
```

## Basic with json body

```js
var docker = require('docker-simple-wrapper');

var body = { Image: 'image-name' };

var options = {
  method: 'POST',
  path: '/containers/create?name=container-name',
  body: body,
};

docker(options, function (error, response, body) {

  if (error || response.statusCode !== 201) {
    return next(error || body); 
  }

  console.log(response, body);

});
```

## Stream

```sh
tar -C directory-with-dockerfile -c . | ./index.js
```

```js
var docker = require('docker-simple-wrapper');

var options = { 
  method: 'POST', 
  path: '/build?t=image-' + state.name, 
  headers: { 'Content-Type': 'application/tar' }, 
  stream: process.openStdin(),
};

docker(options, function (error, response, body) {

  if (error) {
    return next(error); 
  }

  console.log(response, body);

});
```
