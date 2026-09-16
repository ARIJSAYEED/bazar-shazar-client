import { Link } from "react-router";
import { PlusCircle, PackageSearch, ArrowUpRight } from "lucide-react";
import { useUser } from "@clerk/react";

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-base-content">
            Welcome to the dashboard {user.fullName}
          </h1>
          <p className="mt-2 text-sm text-base-content/60">
            Manage your product catalog from here
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Link
            to={"/dashboard/create-product"}
            className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <PlusCircle size={24} />
              </div>
              <ArrowUpRight
                size={18}
                className="text-base-content/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-base-content">
              Create Product
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              Add a new item to your catalog
            </p>
          </Link>

          <Link
            to={"/dashboard/created-products"}
            className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <PackageSearch size={24} />
              </div>
              <ArrowUpRight
                size={18}
                className="text-base-content/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-base-content">
              Created Products
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              View and manage existing products
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
