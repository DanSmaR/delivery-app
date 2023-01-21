const express = require('express');
const { insertLogin } = require('../Controllers/LoginController');

const routes = express.Router();

routes.post('/login', insertLogin);

module.exports = routes;