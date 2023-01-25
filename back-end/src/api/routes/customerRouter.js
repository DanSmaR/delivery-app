const express = require('express');
const getUser = require('../middleware/getUserByToken')
const { getByUser } = require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.use(getUser);

customerRouter.get('/orders', getByUser);

module.exports = customerRouter;
