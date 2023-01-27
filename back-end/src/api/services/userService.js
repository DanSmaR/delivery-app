const { User } = require('../../database/models');
    
const getUsers = async (role) => {
    const result = await User
      .findAll({ where: { role }, attributes: { exclude: ['password', 'email'] } });
    return { status: 200, message: result };
};

module.exports = { getUsers };
