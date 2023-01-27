const express = require('express');
const { getByUser, registerOrderHandler, getOrderByIdHandler } = require('../controllers/customerController');
const getUser = require('../middleware/getUserByToken');

const customerRouter = express.Router();

customerRouter.use(getUser);

customerRouter.get('/orders', getByUser);
customerRouter.get('/orders/:id', getOrderByIdHandler);
customerRouter.post('/orders', registerOrderHandler);

module.exports = customerRouter;
