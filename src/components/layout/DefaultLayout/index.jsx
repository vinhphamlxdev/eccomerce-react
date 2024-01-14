import Post from "../../Post";
import SliderBrand from "../../SliderBrand";
import Footer from "./Footer";
import Header from "./Header";
const DefaultLayout = ({ children }) => {
  return (
    <div className="wrapper-layout">
      <div className="app">
        <Header />
        <>{children}</>
        <SliderBrand />
        <Post />
        <Footer />
      </div>
    </div>
  );
};
export default DefaultLayout;
