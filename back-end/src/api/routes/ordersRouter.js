const express = require('express');
const { updateStatusHandler } = require('../controllers/ordersController');
const getUser = require('../middleware/getUserByToken');

const ordersRouter = express.Router();

ordersRouter.use(getUser);

ordersRouter.put('/:id', updateStatusHandler);

module.exports = ordersRouter;
