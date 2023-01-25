const { Sale } = require('../../database/models');
    
const allOrdersByUser = async (id, role) => {
    const person = (role === 'seller') ? 'sellerId' : 'userId';
    const result = await Sale
      .findAll({ where: { [person]: id } });
    return { status: 200, message: result };
};

const registerOrder = async (data, userId) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = data;
  const result = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
  });
  return { status: 200, message: result };
};

module.exports = { allOrdersByUser, registerOrder };
