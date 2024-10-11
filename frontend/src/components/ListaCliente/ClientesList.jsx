import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClientesList.css"; // Estilo opcional

const ClientesList = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar a lista de usuários
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const [editUsuario, setEditUsuario] = useState(null); // Estado para editar o usuário
  const [novoUsuario, setNovoUsuario] = useState({ nome: "", email: "", senha: "" }); // Estado para criar um novo usuário

  useEffect(() => {
    // Função para buscar os usuários da API
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("https://redev.somee.com/api/usuarios");
        setUsuarios(response.data); // Armazena os dados no estado
        setLoading(false); // Define que o carregamento terminou
      } catch (err) {
        setError(err.message); // Em caso de erro, armazena a mensagem
        setLoading(false); // Define que o carregamento terminou
      }
    };

    fetchUsuarios(); // Chama a função ao montar o componente
  }, []); // O array vazio faz com que o useEffect rode apenas uma vez

  // Função para excluir um usuário
  const handleDelete = async (usuarioId) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await axios.delete(`https://redev.somee.com/api/usuarios/${usuarioId}`);
        setUsuarios(usuarios.filter((usuario) => usuario.usuarioId !== usuarioId));
      } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
      }
    }
  };

  // Função para salvar as edições do usuário
  const handleSaveEdit = async (usuarioId) => {
    if (editUsuario.nome && editUsuario.email) {
      try {
        const response = await axios.put(`https://redev.somee.com/api/usuarios/${usuarioId}`, editUsuario);
        // Atualiza a lista de usuários com os novos dados
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) => 
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

  // Função para criar um novo usuário
  const handleCreate = async () => {
    if (novoUsuario.nome && novoUsuario.email && novoUsuario.senha) {
      try {
        const response = await axios.post("https://redev.somee.com/api/usuarios", novoUsuario);
        setUsuarios([...usuarios, response.data]); // Adiciona o novo usuário à lista
        setNovoUsuario({ nome: "", email: "", senha: "" }); // Limpa os campos após a criação
      } catch (error) {
        console.error("Erro ao criar o usuário:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
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

      {/* Formulário para criar um novo usuário */}
      <div className="create-user-form">
        <input
          type="text"
          placeholder="Nome"
          value={novoUsuario.nome}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={novoUsuario.email}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={novoUsuario.senha}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
        />
        <button onClick={handleCreate}>Criar Novo Usuário</button>
      </div>

      {usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th> {/* Nova coluna para ações */}
            </tr>
          </thead>
          <tbody>
  {usuarios.map((usuario) => (
    <tr key={usuario.usuarioId}> {/* Aqui está a chave */}
      <td>{usuario.usuarioId}</td>
      <td>
        {editUsuario && editUsuario.usuarioId === usuario.usuarioId ? (
          <input
            type="text"
            value={editUsuario.nome}
            onChange={(e) => setEditUsuario({ ...editUsuario, nome: e.target.value })}
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
            onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
          />
        ) : (
          usuario.email
        )}
      </td>
      <td>
        {editUsuario && editUsuario.usuarioId === usuario.usuarioId ? (
          <>
            <button onClick={() => handleSaveEdit(usuario.usuarioId)}>Salvar</button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => handleEdit(usuario)}>Editar</button>
            <button onClick={() => handleDelete(usuario.usuarioId)}>Excluir</button>
          </>
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

export default ClientesList;
