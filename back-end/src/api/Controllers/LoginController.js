const loginService = require('../Services/loginService');

const insertLogin = async (req, res) => {
  console.log('chegou no controller');
    const result = await loginService(req.body);
    console.log('controler recebeu a info');

    if (result.token) {
      return res.status(200).json(result);
    }

    const { status, message } = result;

    return res.status(status).json({ message });
};

module.exports = { insertLogin };