const { getUsers } = require('../services/userService');

const getUsersHandler = async (req, res) => {
  const path = req.url.slice(1);
  const result = await getUsers(path);

  const { status, message } = result;
  return res.status(status).json(message);
};

module.exports = { getUsersHandler };
