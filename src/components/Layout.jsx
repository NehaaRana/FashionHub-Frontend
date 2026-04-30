import NavBar from "./NavBar";
import PromoBar from "./PromoBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <PromoBar />
      <NavBar />

      {/* Page Content */}
      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;