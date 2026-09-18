import { Outlet } from "react-router";
import NavBar from "../components/reuseable-components/NavBar";
import { Footer } from "../components/reuseable-components/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
