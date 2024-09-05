// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Verifica se o usuário está autenticado

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
