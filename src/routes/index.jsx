import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import ProductDeatail from "../pages/ProductDetail";
import ProductPage from "../pages/Products";
import SignUp from "../pages/SignUp";
export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/products",
    component: ProductPage,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/product/:id",
    component: ProductDeatail,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
];
