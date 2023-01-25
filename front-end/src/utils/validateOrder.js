export default function validateOrder(data) {
  return Boolean(data.sellerId
  && data.deliveryAddress
  && data.deliveryNumber
  && data.selectedProductsList.length);
}
