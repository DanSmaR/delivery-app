const { Sale, SaleProduct, sequelize } = require('../../database/models');
    
const allOrdersByUser = async (id, role) => {
    const person = (role === 'seller') ? 'sellerId' : 'userId';
    const result = await Sale
      .findAll({ where: { [person]: id } });
    return { status: 200, message: result };
};

const registerOrder = async (data, userId) => {
  const {
    sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = data;
  try {
    const result = await sequelize.transaction(async (t) => {
      const newSale = await Sale.create({
        userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
      }, { transaction: t });
      await Promise.all(products.map(({ id, quantity }) => SaleProduct
        .create({ saleId: newSale.id, productId: id, quantity }, { transaction: t })));
      return newSale;
    });
    return { status: 200, message: result };
  } catch (error) {
    console.error(error.stack);
  }
};

module.exports = { allOrdersByUser, registerOrder };
