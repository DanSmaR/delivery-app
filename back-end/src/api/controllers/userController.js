const { getUsers } = require('../services/userService');

const getUsersHandler = async (req, res) => {
  const { role } = req.query;
  const result = await getUsers(role);

  const { status, message } = result;
  return res.status(status).json(message);
};

module.exports = { getUsersHandler };
