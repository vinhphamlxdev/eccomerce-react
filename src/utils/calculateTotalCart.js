export default function calculateTotalCart(cartItems = []) {
  return cartItems.reduce((amount, product) => {
    return amount + product.quantity;
  }, 0);
}
