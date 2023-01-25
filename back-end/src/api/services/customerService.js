const { Sale } = require('../../database/models');
    
const allOrdersByUser = async (id, role) => {
    const person = (role === 'seller') ? 'sellerId' : 'userId';
    const result = await Sale
      .findAll({ where: { [person]: id } });
    return { status: 200, message: result };
};

module.exports = { allOrdersByUser };