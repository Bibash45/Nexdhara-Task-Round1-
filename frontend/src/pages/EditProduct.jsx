import React, { useEffect, useState } from "react";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "../redux/productApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { access_token } = useSelector((state) => state.auth || {});

  // Fetch product details
  const {
    data: proDetail,
    isLoading: proDetailLoading,
    isError: proDetailError,
  } = useGetProductDetailQuery({ token: access_token, productId: id });

  // Mutation to update product
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Set form values when product details are loaded
  useEffect(() => {
    if (proDetail) {
      setName(proDetail.data.name || "");
      setStock(proDetail.data.stock || "");
      setPrice(proDetail.data.price || "");
      setDescription(proDetail.data.description || "");
    }
  }, [proDetail]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct({
        productId: id,
        data: { name, stock, price, description },
        token: access_token,
      }).unwrap();

      if (response.success) {
        toast(response.message || "Product updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data?.message || "Failed to update product");
    }
  };

  if (proDetailLoading)
    return (
      <div className="text-center text-lg">Loading product details...</div>
    );
  if (proDetailError)
    return (
      <div className="text-center text-red-500">
        Failed to load product details.
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[830px] gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Edit Product
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
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isLoading
                ? "bg-violet-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
