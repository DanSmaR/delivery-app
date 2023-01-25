const { SalesModel } = require('../../database/models');
    
const allOrdersByUser = async (id, personType) => {
    console.log(personType);
    const result = await SalesModel.findAll({}, {where: { personType: id }});
    return { status: 200, message: result };
};

module.exports = { allOrdersByUser };