const { getUsers, getAllUsers, deleteUser } = require('../services/userService');
const { authenticateToken } = require('../Utils/jwt');

const getUsersHandler = async (req, res) => {
  const role = req.query;
  const result = await getUsers(role);

  const { status, message } = result;
  return res.status(status).json(message);
};

const getUsersByAdmin = async (_req, res) => {
  const result = await getAllUsers();

  const { status, message } = result;
  return res.status(status).json(message);
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  authenticateToken(authorization);
  const result = await deleteUser(id);

  const { status } = result;
  return res.status(status).json({ message: 'user deleted' });
};

module.exports = { getUsersHandler, getUsersByAdmin, deleteUserById };
