const { getOrderById } = require("../services/customerService");
const ordersServices = require('../services/ordersServices');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { id: userId, role } = req.data;
  await ordersServices.updateStatus(id, status);
  const result = await getOrderById(id, userId, role);
  const { message } = result;
  return res.status(202).json(message);
};

module.exports = {
    updateStatus,
};
