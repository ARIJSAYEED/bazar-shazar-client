import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const CreateProductPage = () => {
  const { register, handleSubmit, reset } = useForm();
  // const notify = () => toast("Product Created Successfully!");

  const handleCreateProduct = (data) => {
    // console.log(data);
    axios
      .post("http://localhost:3000/products", data)
      .then((res) => {
        // console.log(res.data);
        // notify();
        if (res.data.success == true) {
          toast.success("Successfully created!");
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>create a product</h1>
      <div>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <fieldset className="fieldset *:w-full max-w-6/12">
            <label className="label">Product Name</label>
            <input {...register("name")} className="input" type="text" />

            <label className="label">Price</label>
            <input {...register("price")} className="input" type="text" />

            <label className="label">Category</label>
            <input {...register("category")} className="input" type="text" />

            <label className="label">Description</label>
            <input {...register("description")} className="input" type="text" />

            <label className="label">Image</label>
            <input {...register("image")} className="input" type="text" />

            <label className="label">Stock</label>
            <input {...register("stock")} className="input" type="text" />

            <button className="btn">Create Product</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
