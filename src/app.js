var fs = require('fs');
var http = require('http');
var https = require('https');
var util = require('util');

var vasync = require('vasync');
var restler = require('restler');

//******************************************************************************
// configuration section
//******************************************************************************

// set the host name as fiery server name or ip address
var hostname = 'the_server_name_or_ip_address';

// set the key to access Fiery API
var apiKey = 'the_api_key';

// set the username to login to the fiery
var username = 'the_username';

// set the password to login to the fiery
var password = 'the_password';

// set the job id on the fiery to retrieve job information and preview
var jobId = 'the_job_id';

// set the full file path for job submission
var fullPath = 'the_job_content_full_file_path';

//******************************************************************************
// sample code group into multiple methods
//******************************************************************************

// get the first page preview of the job
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

// get job information from all jobs on the fiery
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

// get job information of a single job on the fiery
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

// login to the fiery
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

// logout from the fiery
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

// create a new job on the fiery server
function postJobContentSample(cookie, callback) {
    // hack - fiery api does not have full support for multipart/form-data with
    // chunked encoding so file size is needed before sending the request.
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
            console.log();
            console.log('Submit a new job');
            console.log(response);

            callback(null, cookie);
        });
    });
}

// send a print action to a job on the fiery server
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

// update a job attribute value on the fiery server
function updateJobAttributeSample(cookie, callback) {
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
            console.log();
            console.log('Update a job');
            console.log(response);

            callback(null, cookie);
        });
    });

    req.write(JSON.stringify(jobJson));
    req.end();
}


// main method executing all sample code
function main() {
    vasync.waterfall([
        loginSample,
        postJobContentSample,
        getJobsSample,
        getSingleJobSample,
        updateJobAttributeSample,
        printJobSample,
        getJobPreviewSample,
        logoutSample,
    ]);
}

main();
