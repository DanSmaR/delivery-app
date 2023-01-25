const { allOrdersByUser, registerOrder } = require('../services/customerService');

const getByUser = async (req, res) => {
  const { id, role } = req.data
  const result = await allOrdersByUser(id, role);

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

module.exports = { getByUser, registerOrder };
