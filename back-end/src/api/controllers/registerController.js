const registerService = require('../services/registerService');

const register = async (req, res) => {
  const result = await registerService(req.body);

  const { status, message, user } = result;
  const { id, name, email, role } = user
  user = { id, name, email, role };
  return res.status(status).json({ message, user });
};

module.exports = register;