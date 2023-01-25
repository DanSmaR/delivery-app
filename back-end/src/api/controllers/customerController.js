const { allOrdersByUser } = require('../services/customerService');

const getByUser = async (req, res) => {
  const { id, role } = req.data
  const result = await allOrdersByUser(id, role);

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = { getByUser };