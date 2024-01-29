import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { DefaultLayout } from "./components/layout";
import { GlobalStyles } from "./styles/GlobalStyles";
import { publicRoutes } from "./routes";
function App() {
  return (
    <Fragment>
      <GlobalStyles />
      <ToastContainer />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </Fragment>
  );
}

export default App;
