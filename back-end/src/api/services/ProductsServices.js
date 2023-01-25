const { Product } = require('../../database/models');

const allProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  allProducts,
};
