const registerService = require('../services/registerService');

const register = async (req, res) => {
  const result = await registerService(req.body);

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = register;