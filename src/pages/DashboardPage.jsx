import { Link } from "react-router";

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-semibold text-center capitalize">
        welcome to the dashboard!
      </h1>
      <div className="grid grid-cols-4 gap-4">
        <Link
          to={"/dashboard/create-product"}
          className="text-xl font-semibold border p-4 flex justify-center items-center bg-primary text-white hover:scale-105 transition"
        >
          Create Product
        </Link>
        <Link
          to={"/dashboard/created-products"}
          className="text-xl font-semibold border p-4 flex justify-center items-center bg-accent text-white hover:scale-105 transition"
        >
          Created Products
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
