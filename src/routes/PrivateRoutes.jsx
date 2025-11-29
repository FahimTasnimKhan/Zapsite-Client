import React from "react";
import UseAuth from "../hooks/UseAuth";
import { Navigate } from "react-router";

const PrivateRoutes = () => {
  const { user, loading } = UseAuth();
  if (loading) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }

  if (!user) {
    <Navigate to={"/login"}></Navigate>;
  }

  return <div></div>;
};

export default PrivateRoutes;
