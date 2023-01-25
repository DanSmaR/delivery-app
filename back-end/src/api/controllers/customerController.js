const { allOrders } = require('../services/customerService');

const getAll = async (_req, res) => {
  const result = await allOrders();

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = { getAll };