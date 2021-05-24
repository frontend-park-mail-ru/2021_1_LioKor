'use strict';

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;
const STATIC_DIR = 'dist';
const PRIVATE_KEY_PATH = 'devServer/ssl/server.key';
const PUBLIC_KEY_PATH = 'devServer/ssl/server.crt';
const API_URL = 'http://localhost:8000';

const path = require('path');
const fs = require('fs');

const http = require('http');
const https = require('https');

const express = require('express');
const proxy = require('express-http-proxy');

const port = process.env.PORT || 8080;
const app = express();

app.use('/api', proxy(API_URL));
app.use('/media', proxy(API_URL, {
    proxyReqPathResolver: function (req) {
        return '/media' + req.url;
    }
}));

app.use('/', express.static(path.resolve(__dirname, '..', STATIC_DIR)));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', STATIC_DIR, 'index.html'));
});

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH);
const certificate = fs.readFileSync(PUBLIC_KEY_PATH);

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
