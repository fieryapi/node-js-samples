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

        // cookie is needed for other api requests
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


### Create a new job

```js
fullPath = 'the_job_content_full_file_path'  # e.g. d:\business_card.pdf
fs.stat(fullPath, function(err, stats) {
    restler.post('https://' + hostname + '/live/api/v2/jobs', {
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
var jobId = 'the_job_id';
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


### Update attributes of a job

```js
var jobId = 'the_job_id';
var jobJson = {
    attributes: {
        "num copies": 1,
    },
};

var options = {
    hostname: hostname,
    path: '/live/api/v2/jobs/' + jobId,
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

req.write(JSON.stringify(jobJson));
req.end();
```


### Print a job

```js
var jobId = 'the_job_id';
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
var jobId = 'the_job_id';
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
