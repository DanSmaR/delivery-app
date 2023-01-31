const registerService = require('../services/registerService');
const express = require('express');

const app = express();

const register = async (req, res) => {
  const result = await registerService(req.body);
  const { status, message, user } = result;

  app.set('Authorization', user.token);
  
  return res.status(status).json({ message, user });
};

module.exports = register;