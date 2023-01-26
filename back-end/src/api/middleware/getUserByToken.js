const { authenticateToken } = require('../Utils/jwt');

module.exports = async (req, _res, next) => {
    const { authorization: token } = req.headers;
    const data = await authenticateToken(token);
    req.data = data;
    next();
  };
