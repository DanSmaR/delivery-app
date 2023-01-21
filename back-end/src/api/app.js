const express = require('express');
const router = require('./routes/router');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(router);

module.exports = app;
