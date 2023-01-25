const express = require('express');
const { getByUser, registerOrder } = require('../controllers/customerController');
const getUser = require('../middleware/getUserByToken')

const customerRouter = express.Router();

customerRouter.use(getUser);

customerRouter.get('/orders', getByUser);
customerRouter.post('/orders', registerOrder);

module.exports = customerRouter;
