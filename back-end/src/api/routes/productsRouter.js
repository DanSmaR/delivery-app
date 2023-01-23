const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.get('/', ProductsController.allProducts);

module.exports = router;