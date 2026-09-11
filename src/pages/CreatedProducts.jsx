import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const CreatedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    <div>
      these are create products
      <div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {products.map((product, i) => (
                <tr key={i} className="bg-base-200">
                  <th>{i + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td className="space-x-2">
                    <button className="btn">View Details</button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatedProducts;
