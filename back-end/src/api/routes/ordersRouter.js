const express = require('express');
const { updateStatus } = require('../controllers/ordersController');

const ordersRouter = express.Router();

ordersRouter.put('/:id', updateStatus);

module.exports = ordersRouter;
