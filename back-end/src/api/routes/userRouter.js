const express = require('express');
const {
    getUsersHandler,
    getUsersByAdmin,
    deleteUserById,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', getUsersHandler);
userRouter.get('/admin', getUsersByAdmin);
userRouter.delete('/admin/:id', deleteUserById);

module.exports = userRouter;
