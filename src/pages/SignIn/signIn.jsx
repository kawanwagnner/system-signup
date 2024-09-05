import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./css/style.css";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate(); // Inicializar o useNavigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, pass }), // Usando "user" e "pass" no corpo
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar o token no localStorage como "authToken"
        localStorage.setItem("authToken", data.token);
        alert("Login realizado com sucesso!");

        // Redirecionar para a home
        navigate("/");
      } else {
        alert(data.msg || "Erro ao tentar fazer login.");
      }
    } catch (err) {
      alert("Erro ao tentar fazer login: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="form-container">
      <h2 className="form-title">Acesso Restrito</h2>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Usuário"
        required
        className="form-input"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Chave Mestre"
        required
        className="form-input"
      />
      <button type="submit" className="form-button">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
