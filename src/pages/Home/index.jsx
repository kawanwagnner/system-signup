// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css"; // Se desejar adicionar estilos personalizados

const Home = () => {
  return (
    <div className="home">
      <h1>Bem-vindo ao Aplicativo</h1>
      <div className="button-container">
        <Link to="/signin">
          <button className="home-button">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="home-button">Sign Up</button>
        </Link>
        <Link to="/manage-users">
          <button className="home-button">Manage Users</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
