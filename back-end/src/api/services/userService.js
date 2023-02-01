const { User } = require('../../database/models');
    
const getUsers = async (role = {}) => {
    const result = await User
      .findAll({ where: role, attributes: { exclude: ['password', 'email'] } });
    return { status: 200, message: result };
};

const getAllUsers = async () => {
  const result = await User
    .findAll({ attributes: { exclude: ['password'] } });
  
  const users = result.map((user) => user.dataValues);
  return { status: 200, message: users };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return { status: 202 };
};

module.exports = { getUsers, getAllUsers, deleteUser };
