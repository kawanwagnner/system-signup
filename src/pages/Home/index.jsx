// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <h1>Bem-vindo ao Aplicativo</h1>
        <div className="button-container">
          <Link to="/signup">
            <button className="home-button">Cadastar Pessoa</button>
          </Link>

          <Link to="/manage-users">
            <button className="home-button">Gerenciar</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
