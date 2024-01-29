export default function calculateTotalPrice(cartItems = []) {
  return cartItems.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
}
