import Footer from "./Footer";
import Header from "./Header";
const DefaultLayout = ({ children }) => {
  return (
    <div className="wrapper-layout">
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
