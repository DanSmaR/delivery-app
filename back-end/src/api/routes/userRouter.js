const express = require('express');
const { getUsersHandler } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/seller', getUsersHandler);

module.exports = userRouter;
