const { SalesModel } = require('../../database/models');
    
const allOrders = async () => {
    const result = await SalesModel.findAll();
    return { status: 200, message: result };
};

module.exports = { allOrders };