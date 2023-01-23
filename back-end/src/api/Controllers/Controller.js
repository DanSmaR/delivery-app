const loginService = require('../Services/loginService');
const registerService = require('../Services/registerService');

const insertLogin = async (req, res) => {
  const result = await loginService(req.body);

  if (result.token) {
    return res.status(200).json(result);
  }

  const { status, message } = result;
  return res.status(status).json({ message });
};

const registerUser = async (req, res) => {
  const result = registerService(req.body);

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = { insertLogin, registerUser };