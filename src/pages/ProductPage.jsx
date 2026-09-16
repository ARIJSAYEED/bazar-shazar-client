import axios from "axios";
import { useEffect, useState } from "react";
import {
  Store,
  ImageIcon,
  Tag,
  Boxes,
  UserRound,
  PackageSearch,
} from "lucide-react";
import Loading from "../components/reuseable-components/Loading";
import { Link } from "react-router";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-base-content">
              All products
            </h1>
            <p className="mt-1 text-sm text-base-content/60">
              {loading
                ? "Loading products..."
                : `${products.length} product${products.length === 1 ? "" : "s"} available`}
            </p>
          </div>
          <button className="btn btn-outline gap-2">
            <Store size={16} />
            Product-Page
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div>
            {/* <span className="loading loading-spinner loading-md text-primary"></span>
            <p className="text-sm text-base-content/50">Fetching products…</p> */}
            <Loading></Loading>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-base-300 bg-base-100 py-24 text-center">
            <PackageSearch size={28} className="text-base-content/30" />
            <p className="font-medium text-base-content">No products found</p>
            <p className="text-sm text-base-content/50">
              Check back later for new listings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <div
                key={product._id ?? i}
                className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-40 items-center justify-center border-b border-base-200 bg-base-200">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ display: product.image ? "none" : "flex" }}
                  >
                    <ImageIcon size={26} className="text-base-content/30" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`http://localhost:5173/products/${product._id}`}
                      className="cursor-pointer hover:text-blue-400"
                    >
                      <h2 className="font-semibold text-base-content">
                        {product.productName}
                      </h2>
                    </Link>
                    {product.price && (
                      <span className="whitespace-nowrap font-semibold text-primary">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  {product.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-base-content/60">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {product.category && (
                      <span className="badge badge-ghost gap-1">
                        <Tag size={12} />
                        {product.category}
                      </span>
                    )}
                    {product.stock && (
                      <span className="badge badge-ghost gap-1">
                        <Boxes size={12} />
                        {product.stock}
                      </span>
                    )}
                  </div>

                  {product.ownerName && (
                    <div className="mt-4 flex items-center gap-1.5 border-t border-base-200 pt-3 text-xs text-base-content/50">
                      <UserRound size={13} />
                      {product.ownerName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
