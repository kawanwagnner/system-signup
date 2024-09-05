// src/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn/signIn";
import SignUp from "../pages/SignUp/signUp";
import ManageUsers from "../pages/adm";
import Home from "../pages/Home";
import PrivateRoute from "../auth/privateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rota de login, disponível sem autenticação */}
        <Route path="/signin" element={<SignIn />} />

        {/* Todas as outras rotas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute>
              <SignUp />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
