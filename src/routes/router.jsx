import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/ProductPage";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateProductPage from "../pages/CreateProductPage";
import DashboardPage from "../pages/DashboardPage";
import CreatedProducts from "../pages/CreatedProducts";
import PrivateRoute from "./PrivateRoute";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import SignInPage from "../pages/authPages/Signin";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

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
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "products/:id",
        element: (
          <PrivateRoute>
            <ProductDetailsPage></ProductDetailsPage>
          </PrivateRoute>
        ),
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
    path: "/sign-in",
    Component: SignInPage,
  },
]);
export default router;
