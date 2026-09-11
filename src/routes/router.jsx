import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/ProductPage";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateProductPage from "../pages/CreateProductPage";
import DashboardPage from "../pages/DashboardPage";
import CreatedProducts from "../pages/CreatedProducts";

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
    Component: DashboardLayout,
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
]);
export default router;
