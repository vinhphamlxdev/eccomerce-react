import { addProductToCart } from "../store/cart/cartSlice";

function handleAddToCart(product, quantity = 1, dispatch) {
  dispatch(
    addProductToCart({
      ...product,
      quantity: quantity,
    })
  );
}
export default handleAddToCart;
