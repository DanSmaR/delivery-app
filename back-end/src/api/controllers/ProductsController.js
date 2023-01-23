const ProductsServices = require('../services/ProductsServices');

const allProducts = async (_req, res) => {
  const products = await ProductsServices.allProducts();
  return res.status(200).json(products);
};

module.exports = {
  allProducts,
};