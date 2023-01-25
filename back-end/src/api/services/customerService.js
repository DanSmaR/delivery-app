const { SalesModel } = require('../../database/models');
    
const allOrders = async () => {
    const result = await SalesModel.findAll();
    return { status: 200, message: result };
};

const registerOrder = async (data, userId) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = data;
  const result = await SalesModel.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
  });
  return { status: 200, message: result };
};

module.exports = { allOrders, registerOrder };
