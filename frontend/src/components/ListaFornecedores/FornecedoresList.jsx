import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FornecedoresList.css"; // Importação do CSS

const FornecedoresList = () => {
  const [fornecedores, setFornecedores] = useState([]); // Estado para armazenar a lista de fornecedores
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const [novoFornecedor, setNovoFornecedor] = useState({
    nome: "",
    website: "",
  }); // Estado para novo fornecedor

  // Buscar fornecedores da API ao montar o componente
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get(
          "https://redev.somee.com/api/Eventos"
        );
        setFornecedores(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFornecedores(); // Chamada à API
  }, []);

  // Função para excluir fornecedor
  const handleDelete = async (fornecedorId) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await axios.delete(
          `https://redev.somee.com/api/Eventos/${fornecedorId}`
        );
        setFornecedores(
          fornecedores.filter((fornecedor) => fornecedor.fornecedorId !== fornecedorId)
        );
      } catch (error) {
        console.error("Erro ao excluir o fornecedor:", error);
      }
    }
  };

  // Função para criar novo fornecedor
  const handleCreate = async () => {
    if (novoFornecedor.nome && novoFornecedor.website) {
      try {
        const response = await axios.post(
          "https://redev.somee.com/api/Eventos",
          novoFornecedor
        );
        setFornecedores([...fornecedores, response.data]);
        setNovoFornecedor({ nome: "", website: "" });
      } catch (error) {
        console.error("Erro ao criar o fornecedor:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Exibição condicional
  if (loading) return <div>Carregando fornecedores...</div>;
  if (error) return <div>Erro ao carregar fornecedores: {error}</div>;

  return (
    <div className="fornecedores-list-container">
      <h1>Fornecedores</h1>

      {/* Formulário para criar novo fornecedor */}
      <div className="novo-fornecedor-form">
        <input
          type="text"
          placeholder="Nome"
          value={novoFornecedor.nome}
          onChange={(e) =>
            setNovoFornecedor({ ...novoFornecedor, nome: e.target.value })
          }
        />
        <input
          type="url"
          placeholder="Website"
          value={novoFornecedor.website}
          onChange={(e) =>
            setNovoFornecedor({ ...novoFornecedor, website: e.target.value })
          }
        />
        <button onClick={handleCreate}>Criar Novo Fornecedor</button>
      </div>

      {/* Tabela de fornecedores */}
      {fornecedores.length === 0 ? (
        <p>Nenhum fornecedor encontrado.</p>
      ) : (
        <table className="table table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Website</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.fornecedorId}>
                <td>{fornecedor.fornecedorId}</td>
                <td>{fornecedor.nome}</td>
                <td>
                  <a href={fornecedor.website} target="_blank" rel="noreferrer">
                    {fornecedor.website}
                  </a>
                </td>
                <td>
                  <button onClick={() => handleDelete(fornecedor.fornecedorId)}>
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FornecedoresList;
