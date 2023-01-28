const { getOrderById } = require("../services/customerService");
const ordersServices = require('../services/ordersServices');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status: orderStatus } = req.body;
  const { id: userId, role } = req.data;
  await ordersServices.updateStatus(id, orderStatus);
  const { status, message } = await getOrderById(id, userId, role);
  return res.status(status).json({ status: message.status });
};

module.exports = {
    updateStatus,
};
