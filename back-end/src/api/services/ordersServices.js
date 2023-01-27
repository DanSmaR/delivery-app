const { Sale } = require('../../database/models');
    
const updateStatus = async (id, status) => {
    await Sale.update({ status }, { where: { id } });
};

module.exports = { updateStatus };