import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./css/style.css";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const [isOffline, setIsOffline] = useState(false); // Estado para detectar se está offline
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica a conexão de internet ao carregar o componente
    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // Remove os listeners ao desmontar o componente
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (isOffline) {
      alert(
        "Sem conexão com a internet. Verifique sua rede e tente novamente."
      );
      return;
    }

    setLoading(true); // Ativar tela de carregamento

    try {
      const response = await fetch(
        "https://system-signup-people.onrender.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, pass }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("authToken", data.token);
        alert("Login realizado com sucesso!");
        navigate("/");
      } else {
        alert(data.msg || "Erro ao tentar fazer login.");
      }
    } catch (err) {
      alert("Erro ao tentar fazer login: " + err.message);
    } finally {
      setLoading(false); // Desativar tela de carregamento
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      ) : (
        <form onSubmit={handleSignIn} className="form-container">
          <h2 className="form-title">Acesso Restrito</h2>
          <input
            type="text"
            value={user.toLowerCase()}
            onChange={(e) => setUser(e.target.value.replace(/\s/g, ""))} // Remover espaços
            placeholder="Usuário"
            required
            className="form-input"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Alterna entre texto e senha
              value={pass}
              onChange={(e) => setPass(e.target.value.replace(/\s/g, ""))} // Remover espaços
              placeholder="Chave Mestre"
              required
              className="form-input"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
              {/* Ícone de senha */}
            </span>
          </div>
          {isOffline && (
            <div className="offline-warning">Sem conexão com a internet.</div>
          )}
          <button type="submit" className="form-button">
            Entrar
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
