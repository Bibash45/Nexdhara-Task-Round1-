import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Layout = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  console.log(userInfo);
  
  if (!(userInfo?.role === "admin")) {
    {
      return <Navigate to="/login" />;
    }
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
