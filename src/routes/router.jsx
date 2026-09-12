import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/ProductPage";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateProductPage from "../pages/CreateProductPage";
import DashboardPage from "../pages/DashboardPage";
import CreatedProducts from "../pages/CreatedProducts";
import authLayout from "../layouts/authLayout";
import Login from "../pages/authPages/login";
import Signup from "../pages/authPages/signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "products",
        Component: ProductPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "create-product",
        Component: CreateProductPage,
      },
      {
        path: "created-products",
        Component: CreatedProducts,
      },
    ],
  },
  {
    path: "/auth",
    Component: authLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
]);
export default router;
