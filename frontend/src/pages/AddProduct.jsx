import React, { useState } from "react";
import { usePostProductMutation } from "../redux/productApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [postProduct, { isLoading, isError, data, error }] =
    usePostProductMutation();
  const { access_token } = useSelector((state) => state.auth || {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postProduct({
        data: { name, stock, price, description },
        token: access_token,
      }).unwrap()
      if (response.success) {
        console.log(response);
        setDescription("");
        setPrice("");
        setStock("");
        setName("");
        toast.success(response.message || "product added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[830px] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Add Product
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium">
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-600 font-medium">
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-600 font-medium">
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-600 font-medium"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-3 rounded-md font-medium hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
