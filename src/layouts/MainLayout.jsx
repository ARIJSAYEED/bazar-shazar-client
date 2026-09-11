import { Outlet } from "react-router";
import NavBar from "../components/reuseable-components/NavBar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
