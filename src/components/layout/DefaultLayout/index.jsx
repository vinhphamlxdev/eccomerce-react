import { useDispatch, useSelector } from "react-redux";
import Post from "../../Post";
import SliderBrand from "../../SliderBrand";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import BackTop from "./BackTop/BackTop";
import useClickOutSide from "../../../Hooks/useClickOutSide";
const DefaultLayout = ({ children }) => {
  const { menuRef, popupRef, setShow, show } = useClickOutSide();
  useEffect(() => {
    setShow(false);
  });

  return (
    <div className="wrapper-layout">
      <div className="app">
        <Header
          showCategoryMenu={show}
          setShowCategoryMenu={setShow}
          categoryRef={menuRef}
          categoryPopupRef={popupRef}
        />
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
