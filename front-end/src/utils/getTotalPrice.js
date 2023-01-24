export default function getTotalPrice(selectedProductsList) {
  if (!selectedProductsList || !selectedProductsList.length) return false;
  const totalPrice = selectedProductsList
    .reduce((acc, product) => acc + (product.quantity * product.price), 0);
  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
  return roundedTotalPrice;
}
