'use strict';

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const path = require('path');
const fs = require('fs');

const http = require('http');
const https = require('https');

const express = require('express');
const proxy = require('express-http-proxy');

const port = process.env.PORT || 8080;
const app = express();

app.use('/api', proxy('http://localhost:8000'));
app.use('/media', proxy('http://localhost:8000', {
    proxyReqPathResolver: function (req) {
        return '/media' + req.url;
    }
}));

app.use('/', express.static(path.resolve(__dirname, '..', 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const privateKey = fs.readFileSync('devServer/ssl/server.key');
const certificate = fs.readFileSync('devServer/ssl/server.crt');

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate,
}, app);

httpServer.listen(HTTP_PORT, 'localhost', () => {
    console.log(`http server started at :${HTTP_PORT}`);
});
httpsServer.listen(HTTPS_PORT, () => {
    console.log(`https server started at :${HTTPS_PORT}`);
});
