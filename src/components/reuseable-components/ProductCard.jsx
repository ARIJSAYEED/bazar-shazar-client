import { Boxes, ImageIcon, Tag, UserRound } from "lucide-react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
            className="cursor-pointer"
          >
            <h2 className="font-semibold text-base-content capitalize hover:text-blue-500 hover:underline">
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
  );
};

export default ProductCard;
