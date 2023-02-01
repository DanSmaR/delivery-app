const registerService = require('../services/registerService');

const register = async (req, res) => {
  const result = await registerService(req.body);
  const { status, message, user } = result;
  
  return res.status(status).json({ message, user });
};

module.exports = register;