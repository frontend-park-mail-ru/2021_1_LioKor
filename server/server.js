'use strict';

const path = require('path');

const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

/* app.get('/api/swagger', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'api', 'swagger', 'index.html'));
}); */
app.use('/api/swagger/*', express.static(path.resolve(__dirname, '..', 'public', 'api', 'swagger')));

app.use('/api', proxy('http://localhost:8000'));

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
