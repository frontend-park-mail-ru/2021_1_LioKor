'use strict';

const path = require('path');

const express = require('express');
const proxy = require('express-http-proxy');

const port = process.env.PORT || 8080;
const app = express();

app.use('/api/swagger/', express.static(path.resolve(__dirname, '..', 'public', 'api', 'swagger')));
app.use('/', express.static(path.resolve(__dirname, '..', 'public')));
app.use('/api', proxy('http://localhost:8000'));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
