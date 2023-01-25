const { allOrders, registerOrder } = require('../services/customerService');

const getAll = async (_req, res) => {
  const result = await allOrders();

  const { status, message } = result;
  return res.status(status).json({ message });
};

const registerOrder = async (req, res) => {
  const order = req.body;
  const { id } = req.data;
  const result = await registerOrder(order, id);

  const { status, message } = result;
  return res.status(status).json({ message });
};

module.exports = { getAll };
