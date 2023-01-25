const express = require('express');
const { getAll, registerOrder } = require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.get('/orders', getAll);
customerRouter.post('/orders', registerOrder);

module.exports = customerRouter;
