import { Link } from "react-router-dom";
import { useState } from "react";
import SearchAppBar from "../../components/Header";

import "./css/style.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [payOrNot, setPayOrNot] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://system-signup-people.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, payOrNot, endereco, quantidade }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        // Limpa os campos do formulário
        setName("");
        setEndereco("");
        setQuantidade("");
        setPayOrNot("");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Erro ao tentar fazer cadastro: " + err.message);
    }
  };

  return (
    <>
      <SearchAppBar />
      <br />
      <form onSubmit={handleSignUp} className="form-container">
        <h2 className="form-title">Cadastar Pessoa</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          className="form-input"
          maxLength={42}
        />
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          placeholder="Endereço"
          required
          className="form-input"
        />
        <input
          type="text"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          required
          className="form-input"
        />
        <select
          name="payOrNot"
          id="payOrNot"
          value={payOrNot}
          onChange={(e) => setPayOrNot(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Selecionar Status de Pgmt.</option>
          <option value="Pago">Pago</option>
          <option value="Não Pago">Não Pago</option>
        </select>
        <button type="submit" className="form-button">
          Sign Up
        </button>
      </form>
      <br />
      <div className="max-width">
        <Link to="/">
          <button className="back-home">Voltar ao início</button>
        </Link>
        <Link to="/manage-users">
          <button className="back-home">Gerenciar Pessoas</button>
        </Link>
      </div>
    </>
  );
};

export default SignUp;
