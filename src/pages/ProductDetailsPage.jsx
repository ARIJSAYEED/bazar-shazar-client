import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ImageIcon,
  Tag,
  Boxes,
  UserRound,
  Mail,
  PackageSearch,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useUser } from "@clerk/react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { user } = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200/50">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-primary"></span>
          <p className="text-sm text-base-content/50">
            Loading product details…
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200/50">
        <div className="flex flex-col items-center gap-2 text-center">
          <PackageSearch size={28} className="text-base-content/30" />
          <p className="font-medium text-base-content">Product not found</p>
          <p className="text-sm text-base-content/50">
            No product exists with id {`${id}`}.
          </p>
        </div>
      </div>
    );
  }

  const isOwner = userEmail === product.ownerEmail;
  const stock = Number(product.stock) || 0;
  const outOfStock = stock <= 0;

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => Math.min(stock, q + 1));
  };

  const handleQuantityChange = (e) => {
    const val = Number(e.target.value);
    if (Number.isNaN(val)) return;
    setQuantity(Math.min(stock, Math.max(1, val)));
  };

  const handleBuyNow = async () => {
    if (isOwner || outOfStock || quantity < 1) return;

    setBuying(true);
    try {
      const order = {
        productId: product._id,
        productName: product.productName,
        productPrice: product.price,
        quantity,
        customerEmail: userEmail,
        ownerEmail: product.ownerEmail,
      };
      console.log(order);
      // Adjust endpoint/payload to match your backend order route
      // await axios.post("http://localhost:3000/orders", {
      //   productId: product._id,
      //   productName: product.productName,
      //   productPrice: product.price,
      //   quantity,
      //   customerEmail: userEmail,
      //   ownerEmail: product.ownerEmail,
      // });

      // e.g. toast.success("Order placed!") or navigate("/orders")
    } catch (err) {
      console.log(err);
      // e.g. toast.error("Something went wrong")
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image */}
            <div className="flex h-64 items-center justify-center border-b border-base-200 bg-base-200 sm:h-full sm:border-b-0 sm:border-r">
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
                <ImageIcon size={32} className="text-base-content/30" />
              </div>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8">
              {product.category && (
                <span className="badge badge-ghost gap-1 mb-3">
                  <Tag size={12} />
                  {product.category}
                </span>
              )}

              <div>{isOwner && <h1>This is your product</h1>}</div>

              <h1 className="text-2xl font-semibold text-base-content capitalize">
                {product.productName}
              </h1>

              {product.price && (
                <p className="mt-2 text-2xl font-bold text-primary">
                  ${product.price}
                </p>
              )}

              {product.description && (
                <p className="mt-4 text-sm leading-relaxed text-base-content/70">
                  {product.description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {product.stock !== undefined && (
                  <span className="badge badge-outline gap-1">
                    <Boxes size={12} />
                    Stock: {product.stock}
                  </span>
                )}
              </div>

              {/* Quantity + Buy Now */}
              {!isOwner && (
                <div className="mt-6 border-t border-base-200 pt-4">
                  {outOfStock ? (
                    <p className="text-sm font-medium text-error">
                      Out of stock
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-base-content/40">
                        Quantity
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-base-300">
                          <button
                            type="button"
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                            className="btn btn-ghost btn-sm px-3"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={stock}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-14 border-x border-base-300 bg-transparent text-center text-sm font-medium outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleIncrease}
                            disabled={quantity >= stock}
                            className="btn btn-ghost btn-sm px-3"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleBuyNow}
                          disabled={buying}
                          className="btn btn-primary gap-2 flex-1"
                        >
                          {buying ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <ShoppingCart size={16} />
                          )}
                          Buy Now
                        </button>
                      </div>

                      {product.price && (
                        <p className="mt-2 text-xs text-base-content/50">
                          Total: $
                          {(Number(product.price) * quantity).toFixed(2)}
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {(product.ownerName || product.ownerEmail) && (
                <div className="mt-6 space-y-2 border-t border-base-200 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-base-content/40">
                    Listed by
                  </p>
                  {product.ownerName && (
                    <div className="flex items-center gap-1.5 text-sm text-base-content/70">
                      <UserRound size={14} />
                      {product.ownerName}
                    </div>
                  )}
                  {product.ownerEmail && (
                    <div className="flex items-center gap-1.5 text-sm text-base-content/70">
                      <Mail size={14} />
                      {product.ownerEmail}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
