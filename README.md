## node.js samples

Fiery job management samples. Setup the modules in `src` directory with `npm install`, modify `app.js` in the configuration section to connect to the Fiery then execute the script with `node app`.

**Note** Always use secure connection (HTTPS) when connecting to Fiery API in production.


### Login

```js
var loginJson = {
    username: username,
    password: password,
    accessrights: apiKey,
};

var payload = JSON.stringify(loginJson);

var options = {
    hostname: hostname,
    path: '/live/api/v3/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
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

        // cookie is needed for other api requests
        var cookie = res.headers['set-cookie'];
    });
});

req.write(payload);
req.end();
```


### Logout

```js
var options = {
    hostname: hostname,
    path: '/live/api/v3/logout',
    method: 'POST',
    headers: {
        Cookie: cookie,
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


### Create a new job

```js
fullPath = 'the_job_content_full_file_path'  # e.g. d:\business_card.pdf
fs.stat(fullPath, function(err, stats) {
    restler.post('https://' + hostname + '/live/api/v3/jobs', {
        multipart: true,
        headers: {
            cookie: cookie,
        },

        rejectUnauthorized: false,

        data: {
            file: restler.file(fullPath, null, stats.size, null, 'application/octet-stream'),

            // override default number of copies to 10 copies
            'attributes[num copies]': 10,
        },
    }).on('complete', function(response) {
        // do something with the response here
    });
});
```


### Get jobs

```js
var options = {
    hostname: hostname,
    path: '/live/api/v3/jobs',
    method: 'GET',
    headers: {
        Cookie: cookie,
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
var jobId = 'the_job_id';
var options = {
    hostname: hostname,
    path: '/live/api/v3/jobs/' + jobId,
    method: 'GET',
    headers: {
        Cookie: cookie,
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


### Update attributes of a job

```js
var jobId = 'the_job_id';
var jobJson = {
    attributes: {
        "num copies": 1,
    },
};

var payload = JSON.stringify(jobJson);

var options = {
    hostname: hostname,
    path: '/live/api/v3/jobs/' + jobId,
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        Cookie: cookie,
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

req.write(payload);
req.end();
```


### Print a job

```js
var jobId = 'the_job_id';
var options = {
    hostname: hostname,
    path: '/live/api/v3/jobs/' + jobId + '/print',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': 2,
        Cookie: cookie,
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
var jobId = 'the_job_id';
var options = {
    hostname: hostname,
    path: '/live/api/v3/jobs/' + jobId + '/preview/1',
    method: 'GET',
    headers: {
        Cookie: cookie,
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
