var http = require('http');
var https = require('https');
var util = require('util');

var vasync = require('vasync');

var apiKey = '{{the api key}}';
var hostname = '{{the server name or ip address}}';
var jobId = '{{job id}}';
var password = '{{the password}}';
var username = '{{the username}}';


function getJobPreviewSample(cookie, callback) {
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
            console.log();
            console.log('Get job preview');
            var uri = 'data:image/jpeg;base64,' + response;
            console.log(uri);

            callback(null, cookie);
        });
    });

    req.end();
}

function getJobsSample(cookie, callback) {
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
            console.log();
            console.log('Get jobs');
            console.log(response);

            callback(null, cookie);
        });
    });

    req.end();
}

function getSingleJobSample(cookie, callback) {
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
            console.log();
            console.log('Get single job');
            console.log(response);

            callback(null, cookie);
        });
    });

    req.end();
}

function loginSample(callback) {
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
            console.log();
            console.log('Login');
            console.log(response);

            var cookie = res.headers['set-cookie'];
            callback(null, cookie);
        });
    });

    req.write(JSON.stringify(loginJson));
    req.end();
}

function logoutSample(cookie, callback) {
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
            console.log();
            console.log('Logout');
            console.log(response);

            //callback(response.headers['set-cookie']);
        });
    });

    req.end();
}

function printJobSample(cookie, callback) {
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
            console.log();
            console.log('Print a job');
            console.log(response);

            callback(null, cookie);
        });
    });

    req.write('{}');
    req.end();
}


function main() {
    vasync.waterfall([
        loginSample,
        getJobsSample,
        getSingleJobSample,
        printJobSample,
        getJobPreviewSample,
        logoutSample,
    ]);
}

main();
