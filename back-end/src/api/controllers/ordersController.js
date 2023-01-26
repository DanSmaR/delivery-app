const ordersServices = require('../services/ordersServices');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await ordersServices.updateStatus(id, status);
  return res.status(202).json({ message: 'Updated!' });
};

module.exports = {
    updateStatus,
};