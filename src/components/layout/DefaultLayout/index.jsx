import { useDispatch, useSelector } from "react-redux";
import Post from "../../Post";
import SliderBrand from "../../SliderBrand";
import Footer from "./Footer";
import Header from "./Header";
import { setToggleMenu } from "../../../store/global/globalSlice";
import { useEffect } from "react";
import BackTop from "./BackTop/BackTop";
const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToggleMenu(false));
  });

  return (
    <div className="wrapper-layout">
      <div className="app">
        <Header />
        <>{children}</>
        <SliderBrand />
        <Post />
        <Footer />
        <BackTop />
      </div>
    </div>
  );
};
export default DefaultLayout;
