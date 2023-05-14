import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()
  console.log(location);
  if (user) {
    return children;
  } else {
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

export default PrivateRoute;
