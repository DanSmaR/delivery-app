const { allOrdersByUser } = require('../services/customerService');
const { decodeToken } = require('../Utils/jwt');

const getByUser = async (req, res) => {
  const { Authorization } = req.headers;
  const { id } = await decodeToken(Authorization);
  const result = await allOrdersByUser(id, req.body);

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = { getByUser };