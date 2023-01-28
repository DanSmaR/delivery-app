const express = require('express');
const { updateStatus } = require('../controllers/ordersController');
const getUser = require('../middleware/getUserByToken');

const ordersRouter = express.Router();

ordersRouter.use(getUser);

ordersRouter.put('/:id', updateStatus);

module.exports = ordersRouter;
