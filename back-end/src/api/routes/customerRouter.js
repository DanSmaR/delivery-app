const express = require('express');
const { getAll } = require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.get('/orders', getAll);

module.exports = customerRouter;
