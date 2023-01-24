const loginService = require('../services/loginService');
var express = require('express');
var app = express();

const login = async (req, res) => {
  const result = await loginService(req.body);

  if (result.token) {
    app.set('Authorization', result.token);
    return res.status(200).json(result.user);
  }

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = login;