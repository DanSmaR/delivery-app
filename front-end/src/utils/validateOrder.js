export default function validateOrder(order) {
  return order.userId
  && order.sellerId
  && order.deliveryAddress
  && order.deliveryNumber
  && order.products.length;
}
