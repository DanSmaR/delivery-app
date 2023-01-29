const express = require('express');
const {
  getByUser, registerOrderHandler, getOrderByIdHandler,
} = require('../controllers/ordersController');
const getUser = require('../middleware/getUserByToken');

const sellerRouter = express.Router();

sellerRouter.use(getUser);

sellerRouter.get('/orders', getByUser);
sellerRouter.get('/orders/:id', getOrderByIdHandler);
sellerRouter.post('/orders', registerOrderHandler);

module.exports = sellerRouter;
