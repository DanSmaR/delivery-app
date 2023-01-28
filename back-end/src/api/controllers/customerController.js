const { allOrdersByUser, registerOrder, getOrderById } = require('../services/customerService');

const getByUser = async (req, res) => {
  const { id, role } = req.data;
  console.log(id);
  const result = await allOrdersByUser(id, role);

  const { status, message } = result;
  return res.status(status).json(message);
};

const getOrderByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.data;
  
  const result = await getOrderById(id, userId, role);

  const { status, message } = result;
  return res.status(status).json(message);
};

const registerOrderHandler = async (req, res) => {
  const order = req.body;
  const { id } = req.data;
  const result = await registerOrder(order, id);

  const { status, message } = result;
  return res.status(status).json(message);
};

module.exports = { getByUser, registerOrderHandler, getOrderByIdHandler };
