import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClientesList.css"; // Importação do CSS
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

const ClientesList = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar a lista de usuários
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const [editUsuario, setEditUsuario] = useState(null); // Estado para editar o usuário
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  }); // Estado para novo usuário

  // Buscar usuários da API ao montar o componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "https://redev.somee.com/api/usuarios"
        );
        setUsuarios(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsuarios(); // Chamada à API
  }, []);

  // Função para excluir usuário
  const handleDelete = async (usuarioId) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await axios.delete(`https://redev.somee.com/api/usuarios/${usuarioId}`);
        setUsuarios(
          usuarios.filter((usuario) => usuario.usuarioId !== usuarioId)
        );
      } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
      }
    }
  };

  // Função para salvar edição de usuário
  const handleSaveEdit = async (usuarioId) => {
    if (editUsuario.nome && editUsuario.email) {
      try {
        const response = await axios.put(
          `https://redev.somee.com/api/usuarios/${usuarioId}`,
          editUsuario
        );
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.usuarioId === usuarioId ? response.data : usuario
          )
        );
        setEditUsuario(null);
        navigate(0);
      } catch (error) {
        console.error("Erro ao salvar o usuário:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Função para editar usuário
  const handleEdit = (usuario) => {
    setEditUsuario({ ...usuario });
  };

  // Função para cancelar edição
  const handleCancelEdit = () => {
    setEditUsuario(null);
  };

  // Função para criar novo usuário
  const handleCreate = async () => {
    if (novoUsuario.nome && novoUsuario.email) {
      try {
        const response = await axios.post(
          "https://redev.somee.com/api/usuarios",
          novoUsuario
        );
        setUsuarios([...usuarios, response.data]);
        setNovoUsuario({ nome: "", email: "", senha: "" });
      } catch (error) {
        console.error("Erro ao criar o usuário:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Exibição condicional
  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div>Erro ao carregar usuários: {error}</div>;

  return (
    <>
      <Header />
      <div className="clientes-list-container">
        <h1>Clientes</h1>

        {/* Formulário para criar novo usuário */}
        <div className="novo-usuario-form">
          <input
            type="text"
            placeholder="Nome"
            value={novoUsuario.nome}
            onChange={(e) =>
              setNovoUsuario({ ...novoUsuario, nome: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={novoUsuario.email}
            onChange={(e) =>
              setNovoUsuario({ ...novoUsuario, email: e.target.value })
            }
          />

          <button onClick={handleCreate}>Criar Novo Usuário</button>
        </div>

        {/* Tabela de usuários */}
        {usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          <table className="table border-0">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.usuarioId} className="">
                  {/* <td>{usuario.usuarioId}</td> */}
                  <td>
                    {editUsuario &&
                    editUsuario.usuarioId === usuario.usuarioId ? (
                      <input
                        type="text"
                        value={editUsuario.nome}
                        onChange={(e) =>
                          setEditUsuario({
                            ...editUsuario,
                            nome: e.target.value,
                          })
                        }
                      />
                    ) : (
                      usuario.nome
                    )}
                  </td>
                  <td>
                    {editUsuario &&
                    editUsuario.usuarioId === usuario.usuarioId ? (
                      <input
                        className="corInput"
                        type="email"
                        value={editUsuario.email}
                        onChange={(e) =>
                          setEditUsuario({
                            ...editUsuario,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      usuario.email
                    )}
                  </td>
                  <td>
                    {editUsuario &&
                    editUsuario.usuarioId === usuario.usuarioId ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(usuario.usuarioId)}
                        >
                          Salvar
                        </button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(usuario)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className=""
                          onClick={() => handleDelete(usuario.usuarioId)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ClientesList;
