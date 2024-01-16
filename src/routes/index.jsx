import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import ProductDeatail from "../pages/ProductDetail";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import Profile from "../pages/Profile";
export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/signup",
    component: SignUpPage,
  },
  {
    path: "/signin",
    component: SignInPage,
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
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/profile",
    component: Profile,
  },
];
