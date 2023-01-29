const express = require('express');
const { getUsersHandler } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', getUsersHandler);

module.exports = userRouter;
