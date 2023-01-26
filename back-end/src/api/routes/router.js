const express = require('express');
const loginRouter = require('./loginRouter');
const productsRouter = require('./productsRouter');
const registerRouter = require('./registerRouter');
const customerRouter = require('./customerRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/customer', customerRouter);
router.use('/user', userRouter);

module.exports = router;
