import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Package,
  Tag,
  DollarSign,
  AlignLeft,
  ImageIcon,
  Boxes,
  Plus,
} from "lucide-react";
import { useUser } from "@clerk/react";

const CreateProductPage = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useUser();
  const userEmail = user.primaryEmailAddress.emailAddress;
  // console.log(user);
  // console.log(userEmail);

  const imageUrl = watch("image");

  const handleCreateProduct = (data) => {
    // console.log(data);
    setSubmitting(true);
    axios
      .post("http://localhost:3000/products", data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success("Successfully created!");
          reset();
          navigate("/dashboard/created-products");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-base-content">
              Create a product
            </h1>
            <p className="text-sm text-base-content/60">
              Add a new item to your catalog
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <form
            onSubmit={handleSubmit(handleCreateProduct)}
            className="p-6 sm:p-8"
          >
            {/* Image preview */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-base-300 bg-base-200">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Product preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <ImageIcon size={22} className="text-base-content/30" />
                )}
              </div>
              <div className="flex-1">
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <ImageIcon size={15} className="text-base-content/50" />
                  Image URL
                </label>
                <input
                  {...register("image")}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="https://example.com/product.jpg"
                />
              </div>
            </div>

            <div className="divider my-2"></div>

            {/* Main fields */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <Package size={15} className="text-base-content/50" />
                  Product name
                </label>
                <input
                  {...register("productName")}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="e.g. Wireless Mouse"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <Package size={15} className="text-base-content/50" />
                  Owner name
                </label>
                <input
                  {...register("ownerName")}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="e.g. mr/mrs.xyz"
                  defaultValue={user.fullName}
                  readOnly
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <Package size={15} className="text-base-content/50" />
                  Owner Email
                </label>
                <input
                  {...register("ownerEmail")}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="e.g. mr/mrs.xyz"
                  defaultValue={userEmail}
                  readOnly
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <DollarSign size={15} className="text-base-content/50" />
                  Price
                </label>
                <label className="input input-bordered flex w-full items-center gap-2">
                  <span className="text-base-content/40">$</span>
                  <input
                    {...register("price")}
                    type="text"
                    className="grow"
                    placeholder="0.00"
                  />
                </label>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <Boxes size={15} className="text-base-content/50" />
                  Stock
                </label>
                <input
                  {...register("stock")}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Quantity available"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <Tag size={15} className="text-base-content/50" />
                  Category
                </label>
                <input
                  {...register("category")}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="e.g. Electronics"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-base-content">
                  <AlignLeft size={15} className="text-base-content/50" />
                  Description
                </label>
                <input
                  {...register("description")}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Short description of the product"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-base-200 pt-6">
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-ghost"
              >
                Clear
              </button>
              <button
                type="submit"
                className="btn btn-primary gap-2"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
