const loginService = require('../services/loginService');

const login = async (req, res) => {
  const result = await loginService(req.body);
  if (result.token) {
    return res.status(200).json(result);
  }

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = login;