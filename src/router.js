const http = require('http');
const fs = require('fs');
const pg = require('pg');
const postData = require('./queries/postData.js');
const queryString = require('querystring');
const getData = require('./queries/getData.js');

const router = (request, response) => {
    const endpoint = request.url.split('/')[1];

    if (endpoint === '') {
        fs.readFile(__dirname + "/../public/index.html", function(error, file) {
            if (error) {
                response.writeHead(500, 'Content-Type:text/html');
                response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
                console.log(error);
            } else {
                response.writeHead(200, {
                    "Content-Type": "text/html"
                });
                response.end(file);
            }
        });
    } else if (endpoint === "fff") {
        getData((err, res) => {
            if (err) {
                response.writeHead(500, 'Content-Type:text/html');
                response.end('<h1>Sorry, there was a problem getting the users</h1>');
                console.log(error);
            } else {
                let output = JSON.stringify(res);
                response.writeHead(200, {
                    'content-type': 'application/json'
                });
                response.end(output);
            }
        });
    } else if (endpoint === "create-scg") {
        let data = '';
        request.on('data', function(chunk) {
            data += chunk;
        });
        request.on('end', () => {
            const name = queryString.parse(data).name;
            const content = queryString.parse(data).content;
            const session = queryString.parse(data).session;
            postData(name, content, session, (err, res) => {
                if (err) {
                    response.writeHead(500, 'Content-Type:text/html');
                    response.end('<h1>Sorry, there was a problem adding that user</h1>');
                    console.log(err)
                }
            });
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            fs.readFile(__dirname + "/../public/index.html", function(error, file) {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    response.end(file);
                }
            });
        });
    } else {
        const fileName = request.url;
        const fileType = request.url.split(".")[1];
        fs.readFile(__dirname + "/../public" + fileName, function(error, file) {
            if (error) {
                response.writeHead(500, 'Content-Type:text/html');
                response.end('<h1>Sorry, there was a problem loading this page</h1>');
                console.log(error);
            } else {
                response.writeHead(200, {
                    "Content-Type": "text/" + fileType
                });
                response.end(file);
            }
        });
    }
};

module.exports = router;