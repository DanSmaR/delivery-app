const { User } = require('../../database/models');
    
const getUsers = async (role = {}) => {
    const result = await User
      .findAll({ where: role, attributes: { exclude: ['password', 'email'] } });
    return { status: 200, message: result };
};

const getAllUsers = async () => {
  const result = await User
    .findAll({ attributes: { exclude: ['password'] } });
  return { status: 200, message: result };
};

const deleteUser = async (id) => {
  const result = await User
    .deleteAll({ where: id });
  return { status: 202, message: result };
};

module.exports = { getUsers, getAllUsers, deleteUser };
