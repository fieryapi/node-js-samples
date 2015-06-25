## node-js-samples

Fiery job management samples. Setup the modules with `npm install` then execute the script with `node app`.

**Note** Always use secure connection (HTTPS) when connecting to Fiery API in production.


### Login

```js
var loginJson = {
    username: username,
    password: password,
    accessrights: apiKey,
};

var options = {
    hostname: hostname,
    path: '/live/api/v2/login',
    method: 'POST',
    headers: {
        content_type: 'application/json',
    },

    rejectUnauthorized: false,
};

var req = https.request(options, function (res) {
    var response = '';

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        response = response + chunk;
    }).on('end', function () {
        // do something with the response here

        var cookie = res.headers['set-cookie'];
    });
});

req.write(JSON.stringify(loginJson));
req.end();
```


### Logout

```js
var options = {
    hostname: hostname,
    path: '/live/api/v2/logout',
    method: 'POST',
    headers: {
        cookie: cookie,
    },

    rejectUnauthorized: false,
};

var req = https.request(options, function (res) {
    var response = '';

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        response = response + chunk;
    }).on('end', function () {
        // do something with the response here
    });
});

req.end();
```


### Get jobs

```js
var options = {
    hostname: hostname,
    path: '/live/api/v2/jobs',
    method: 'GET',
    headers: {
        cookie: cookie,
    },

    rejectUnauthorized: false,
};

var req = https.request(options, function (res) {
    var response = '';

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        response = response + chunk;
    }).on('end', function () {
        // do something with the response here
    });
});

req.end();
```


### Get single job

```js
var options = {
    hostname: hostname,
    path: '/live/api/v2/jobs/' + jobId,
    method: 'GET',
    headers: {
        cookie: cookie,
    },

    rejectUnauthorized: false,
};

var req = https.request(options, function (res) {
    var response = '';

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        response = response + chunk;
    }).on('end', function () {
        // do something with the response here
    });
});

req.end();
```


### Print a job

```js
var options = {
    hostname: hostname,
    path: '/live/api/v2/jobs/' + jobId + '/print',
    method: 'PUT',
    headers: {
        content_type: 'application/json',
        cookie: cookie,
    },

    rejectUnauthorized: false,
};

var req = https.request(options, function (res) {
    var response = '';

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        response = response + chunk;
    }).on('end', function () {
        // do something with the response here
    });
});

req.write('{}');
req.end();
```


### Get job preview

```js
var options = {
    hostname: hostname,
    path: '/live/api/v2/jobs/' + jobId + '/preview/1',
    method: 'GET',
    headers: {
        cookie: cookie,
    },

    rejectUnauthorized: false,
};

var req = https.request(options, function (res) {
    var response = '';

    res.on('data', function (chunk) {
        response = response + chunk.toString('base64');
    }).on('end', function () {
        // do something with the response here
    });
});

req.end();
```
