import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditClientes.module.css"; // Estilo opcional

const EditClientes = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar a lista de usuários
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const [editUsuario, setEditUsuario] = useState(null); // Estado para editar o usuário

  useEffect(() => {
    // Função para buscar os usuários da API
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "https://redev.somee.com/api/usuarios"
        ); // URL da API correta para usuários
        setUsuarios(response.data); // Armazena os dados no estado
        setLoading(false); // Define que o carregamento terminou
      } catch (err) {
        setError(err.message); // Em caso de erro, armazena a mensagem
        setLoading(false); // Define que o carregamento terminou
      }
    };

    fetchUsuarios(); // Chama a função ao montar o componente
  }, []); // O array vazio faz com que o useEffect rode apenas uma vez

  // Função para salvar as edições do usuário
  const handleSaveEdit = async (usuarioId) => {
    if (editUsuario.nome && editUsuario.email && editUsuario.senha) {
      try {
        const response = await axios.put(
          `https://redev.somee.com/api/usuarios/${usuarioId}`,
          editUsuario
        );
        setUsuarios(
          usuarios.map((usuario) =>
            usuario.usuarioId === usuarioId ? response.data : usuario
          )
        );
        setEditUsuario(null); // Limpa o estado de edição
      } catch (error) {
        console.error("Erro ao salvar o usuário:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Função para editar um usuário
  const handleEdit = (usuario) => {
    setEditUsuario({ ...usuario }); // Preenche o estado com os dados atuais do usuário
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditUsuario(null); // Limpa o estado de edição
  };

  // Exibição condicional baseada no estado
  if (loading) {
    return <div>Carregando usuários...</div>;
  }

  if (error) {
    return <div>Erro ao carregar usuários: {error}</div>;
  }

  return (
    <div className="clientes-list-container">
      <h1>Lista de Usuários</h1>

      {usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.usuarioId}>
                <td>{usuario.usuarioId}</td>
                <td>
                  {editUsuario && editUsuario.usuarioId === usuario.usuarioId ? (
                    <input
                      type="text"
                      value={editUsuario.nome}
                      onChange={(e) =>
                        setEditUsuario({ ...editUsuario, nome: e.target.value })
                      }
                    />
                  ) : (
                    usuario.nome
                  )}
                </td>
                <td>
                  {editUsuario && editUsuario.usuarioId === usuario.usuarioId ? (
                    <input
                      type="email"
                      value={editUsuario.email}
                      onChange={(e) =>
                        setEditUsuario({ ...editUsuario, email: e.target.value })
                      }
                    />
                  ) : (
                    usuario.email
                  )}
                </td>
                <td>
                  {editUsuario && editUsuario.usuarioId === usuario.usuarioId ? (
                    <input
                      type="password"
                      value={editUsuario.senha}
                      onChange={(e) =>
                        setEditUsuario({ ...editUsuario, senha: e.target.value })
                      }
                    />
                  ) : (
                    "••••••" // Senha não exibida por questões de segurança
                  )}
                </td>
                <td>
                  {editUsuario && editUsuario.usuarioId === usuario.usuarioId ? (
                    <>
                      <button onClick={() => handleSaveEdit(usuario.usuarioId)}>
                        Salvar
                      </button>
                      <button onClick={handleCancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(usuario)}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EditClientes;
