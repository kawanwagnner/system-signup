import React, { useState } from "react";
import "./css/style.css"; // Importa o arquivo CSS externo

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Erro ao tentar fazer login: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="form-container">
      <h2 className="form-title">Sign In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="form-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="form-input"
      />
      <select name="payOrNot" id="payOrNot" className="form-select">
        <option>Selecionar Status de Pgmt.</option>
        <option value="Pago">Pago</option>
        <option value="Não Pago">Não Pago</option>
      </select>
      <button type="submit" className="form-button">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
