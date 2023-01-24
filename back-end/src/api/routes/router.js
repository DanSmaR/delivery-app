const express = require('express');
const loginRouter = require('./loginRouter');
const productsRouter = require('./productsRouter');
const registerRouter = require('./registerRouter');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);

module.exports = router;