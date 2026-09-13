import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, Trash2, PackageSearch, ImageIcon } from "lucide-react";
import { useUser } from "@clerk/react";

const CreatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();
  console.log(user);
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  console.log("ther user email is", userEmail);

  useEffect(() => {
    if (!isLoaded || !userEmail) return;

    axios
      .get(`http://localhost:3000/products?email=${userEmail}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isLoaded, userEmail]);

  const handleDelete = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.acknowledged == true) {
          toast.success("Successfully Deleted the Product!");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id),
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PackageSearch size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-base-content">
              Created products
            </h1>
            <p className="text-sm text-base-content/60">
              {loading
                ? "Loading your catalog..."
                : `${products.length} product${products.length === 1 ? "" : "s"} in your catalog`}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <span className="loading loading-spinner loading-md text-primary"></span>
              <p className="text-sm text-base-content/50">Fetching products…</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <PackageSearch size={28} className="text-base-content/30" />
              <p className="font-medium text-base-content">No products yet</p>
              <p className="text-sm text-base-content/50">
                Products you create will show up here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-xs uppercase tracking-normal text-base-content/50">
                    <th className="font-medium">#</th>
                    <th className="font-medium">Product</th>
                    <th className="font-medium">Description</th>
                    <th className="font-medium">Price</th>
                    <th className="text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => (
                    <tr key={product._id ?? i} className="hover:bg-base-200/60">
                      <th className="text-base-content/40">{i + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-base-300 bg-base-200">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.productName}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <ImageIcon
                                size={16}
                                className="text-base-content/30"
                              />
                            )}
                          </div>
                          <span className="font-medium text-base-content">
                            {product.productName}
                          </span>
                        </div>
                      </td>
                      <td className="max-w-xs truncate text-base-content/60">
                        {product.description}
                      </td>
                      <td className="font-medium text-base-content">
                        ${product.price}
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button className="btn btn-ghost btn-sm gap-1.5">
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-sm gap-1.5 border-none bg-error/10 text-error hover:bg-error hover:text-error-content"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatedProducts;
