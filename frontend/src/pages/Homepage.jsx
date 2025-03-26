import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../redux/productApiSlice";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../redux/userApiSlice";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const { access_token } = useSelector((state) => state.auth || {});

  const [searchValue, setSearchValue] = useState("");
  const { pathname } = useLocation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageNumber =
    queryParams.get("pageNumber") === null ? 1 : queryParams.get("pageNumber");
  const keyword =
    queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

  console.log(`keyword: ${keyword}, pageNumber: ${pageNumber}`);

  const {
    data: productlist,
    isLoading: productlistLoading,
    refetch,
  } = useGetProductQuery({ token: access_token, keyword, pageNumber });

  const [deleteProduct, { isLoading, isError, data, error }] =
    useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct({
        token: access_token,
        productId: id,
      }).unwrap();
      if (response.success) {
        console.log(response);
        toast.success(response.message);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (productlistLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto min-h-[830px]">
      <table className="min-w-full  divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {productlist &&
            productlist.data.length &&
            productlist.data.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="px-4 py-4 text-sm text-slate-900 font-medium">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 font-medium">
                    {item.stock}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 font-medium">
                    {item.price}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 font-medium">
                    {item.description}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex gap-6 flex-wrap ">
                      <button
                        onClick={() => navigate(`/edit/${item._id}`)}
                        className="text-blue-600 font-medium hover:ml-2 transition-all duration-350 cursor-pointer"
                      >
                        <FaEdit size={25} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 font-medium hover:ml-2 transition-all duration-350 cursor-pointer"
                      >
                        <RiDeleteBin6Line size={25} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="mr-5">
        <Paginate
          pages={productlist?.meta?.pages}
          page={productlist?.meta?.page}
          keyword={productlist?.meta?.keyword}
        />
      </div>
    </div>
  );
};

export default Homepage;
