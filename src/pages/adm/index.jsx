import React, { useState, useEffect } from "react";
import "./css/style.css";
import SearchAppBar from "../../components/Header";
import { Link } from "react-router-dom";

// Componente do Pop-up para Editar Usuário
const EditUserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    payOrNot: user.payOrNot,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/update/${user._id}`,
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
            E-mail:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
          <label>
            Nova Senha:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
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

// Lista de Usuários
const UserList = ({ users, onDelete, onEdit }) => {
  if (!users || users.length === 0) {
    return <p className="empty-message">Nenhum usuário disponível.</p>;
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user._id} className="user-item">
          <span className="user-info">
            {user.name} ({user.email})
          </span>
          <span
            className={`pay-status ${
              user.payOrNot === "Pago" ? "paid" : "not-paid"
            }`}
          >
            {user.payOrNot === "Pago" ? "Pago" : "Não Pago"}
          </span>
          <button className="edit-button" onClick={() => onEdit(user)}>
            ✏️ Editar
          </button>
          <button className="delete-button" onClick={() => onDelete(user._id)}>
            Deletar
          </button>
        </li>
      ))}
    </ul>
  );
};

// Componente principal para Gerenciar Usuários
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Para gerenciar o usuário que está sendo editado

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
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
        `http://localhost:3000/api/users/${userId}`,
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
        <UserList
          users={users}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
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
