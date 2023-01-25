const express = require('express');
const { getByUser } = require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.get('/orders', getByUser);

module.exports = customerRouter;
