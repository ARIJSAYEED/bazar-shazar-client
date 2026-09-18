import axios from "axios";
import { useEffect, useState } from "react";
import { Store, PackageSearch } from "lucide-react";
import Loading from "../components/reuseable-components/Loading";
import ProductCard from "../components/reuseable-components/ProductCard";

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
            Cart
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div>
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard
                key={product._id ?? i}
                product={product}
              ></ProductCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
