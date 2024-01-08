import Home from "../pages/Home";
import Product from "../pages/Products";
import SignUp from "../pages/SignUp";
export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/products",
    component: Product,
  },
  {
    path: "/signup",
    component: SignUp,
    layout: null,
  },
];
