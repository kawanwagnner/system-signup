import React, { useState, useEffect } from "react";
import SearchAppBar from "../../components/Header";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import "./css/style.css";

// Componente do Pop-up para Editar Usuário
const EditUserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    payOrNot: user.payOrNot,
    endereco: user.endereco,
    quantidade: user.quantidade,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantidade") {
      // Permite apenas números e define o valor como uma string numérica
      const numericValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://system-signup-people.onrender.com/api/users/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onSave(); // Atualiza a lista de usuários
        alert("Usuário atualizado com sucesso!");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Erro ao atualizar usuário: " + err.message);
    }

    onClose(); // Fecha o pop-up
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Quantidade:
            <input
              type="text"
              name="quantidade"
              value={formData.quantidade}
              onInput={handleChange}
              required
            />
          </label>
          <label>
            Situação de Pagamento:
            <select
              name="payOrNot"
              value={formData.payOrNot}
              onChange={handleChange}
              required
            >
              <option value="Pago">Pago</option>
              <option value="Não Pago">Não Pago</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit" className="back-home">
              Salvar
            </button>
            <button type="button" className="delete-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Lista de Usuários com funcionalidade de pesquisa
const UserList = ({ users, onDelete, onEdit, searchTerm }) => {
  if (!users || users.length === 0) {
    return <p className="empty-message">Nenhum usuário disponível.</p>;
  }

  // Filtrar os usuários com base no nome e no termo de busca
  const filteredUsers = users.filter(
    (userObj) =>
      userObj.name &&
      userObj.name.trim().toLowerCase() !== "adm" &&
      userObj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Verificar se há usuários após a filtragem
  if (filteredUsers.length === 0) {
    return <p className="empty-message">Nenhum usuário encontrado.</p>;
  }

  return (
    <ul className="user-list">
      {filteredUsers.map((userObj) => (
        <li key={userObj._id} className="user-item">
          <span className="user-info">
            <strong>Nome:</strong> {userObj.name} <br /> <Box my={1} />{" "}
            <strong>Endereço:</strong> {userObj.endereco} <br />
            <Box my={1} />
            <strong>Quantidade:</strong> {userObj.quantidade}
          </span>
          <div className="btns">
            <span
              className={`pay-status ${
                userObj.payOrNot === "Pago" ? "paid" : "not-paid"
              }`}
            >
              {userObj.payOrNot === "Pago" ? "Pago" : "Não Pago"}
            </span>
            <button className="edit-button" onClick={() => onEdit(userObj)}>
              ✏️ Editar
            </button>
            <button
              className="delete-button"
              onClick={() => onDelete(userObj._id)}
            >
              Deletar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Componente principal para Gerenciar Usuários
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Para gerenciar o usuário que está sendo editado
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://system-signup-people.onrender.com/api/users"
      );
      const data = await response.json();

      if (response.ok) {
        const sortedUsers = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUsers(sortedUsers);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Erro ao buscar usuários: " + err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://system-signup-people.onrender.com/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        alert("Usuário deletado com sucesso!");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Erro ao deletar usuário: " + err.message);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Define o usuário que está sendo editado
  };

  const handleSave = () => {
    setEditingUser(null); // Fecha o pop-up
    fetchUsers(); // Recarrega a lista de usuários após edição
  };

  const handleCloseModal = () => {
    setEditingUser(null); // Fecha o pop-up
  };

  return (
    <>
      <SearchAppBar />
      <br />
      <div className="manage-users-container">
        <h2 className="manage-users-title">Gerenciar Usuários</h2>

        {/* Campo de busca */}
        <input
          type="text"
          placeholder="Buscar usuário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <UserList
          users={users}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
          searchTerm={searchTerm}
        />
      </div>
      <br />
      <div className="max-width">
        <Link to="/">
          <button className="back-home">Voltar ao Início</button>
        </Link>
        <Link to="/signUp">
          <button className="back-home">Cadastrar Nova Pessoa</button>
        </Link>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ManageUsers;
