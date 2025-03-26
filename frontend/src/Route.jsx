import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "edit/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

const MyRoute = () => {
  return <RouterProvider router={router} />;
};

export default MyRoute;
