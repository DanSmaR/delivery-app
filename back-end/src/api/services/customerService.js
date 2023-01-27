const { User, Sale, SaleProduct, sequelize, Product } = require('../../database/models');

const getOrdersOptions = {
  include: [
    {
      model: Product,
      as: 'products',
    },
    {
      model: User,
      as: 'seller',
    }
  ]
};

const allOrdersByUser = async (id, role) => {
    const person = (role === 'seller') ? 'sellerId' : 'userId';
    const result = await Sale
      .findAll({ where: { [person]: id } });
    return { status: 200, message: result };
};

const getOrderById = async (id, userId, role) => {
  const person = (role === 'seller') ? 'sellerId' : 'userId';
  const result = await Sale.findByPk(id, {
    where: {
      [person]: userId,
    },
    ...getOrdersOptions,
  });
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
    return { status: 201, message: result };
  } catch (error) {
    console.error(error.stack);
  }
};

module.exports = { allOrdersByUser, registerOrder, getOrderById };
