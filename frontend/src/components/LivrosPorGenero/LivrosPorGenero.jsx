import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LivrosPorGenero = () => {
  const { genero } = useParams(); // Obtém o gênero da URL
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comentario, setComentario] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const usuarioId = localStorage.getItem('usuarioId'); // Captura o ID do usuário logado

  // Função para buscar livros por gênero
  const fetchLivrosPorGenero = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genero}`
      );
      setLivros(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar livros por gênero:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivrosPorGenero();
  }, [genero]);

  // Função para enviar o comentário
  const enviarComentario = async (livroId) => {
    if (!comentario || !usuarioId) return;
    
    const novoComentario = {
      usuariosId: usuarioId,
      googleBooksId: livroId,
      nota: 5, // Exemplo, pode ser dinamicamente ajustado
      comentario: comentario,
    };

    try {
      await axios.post("http://redev.somee.com/api/Avaliacoes", novoComentario);
      alert("Comentário enviado com sucesso!");
      setComentario(""); // Limpa o campo de comentário após o envio
    } catch (error) {
      console.error("Erro ao enviar o comentário:", error);
      alert("Erro ao enviar o comentário");
    }
  };

  if (loading) return <p>Carregando livros...</p>;

  return (
    <div className="container mt-4">
      <h2>Livros do gênero: {genero}</h2>
      <div className="row">
        {livros.map((livro) => (
          <div className="col-md-4 mb-3" key={livro.id}>
            <div className="card h-100">
              <img
                src={livro.volumeInfo.imageLinks?.thumbnail}
                className="card-img-top"
                alt={livro.volumeInfo.title}
              />
              <div className="card-body">
                <h5 className="card-title">{livro.volumeInfo.title}</h5>
                <p className="card-text">{livro.volumeInfo.description}</p>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setLivroSelecionado(livro.id)}
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selecione um livro para comentar */}
      {livroSelecionado && (
        <div className="comentario-section">
          <h3>Comentar no livro selecionado</h3>
          <textarea
            className="form-control"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escreva seu comentário..."
          ></textarea>
          <button
            className="btn btn-success mt-2"
            onClick={() => enviarComentario(livroSelecionado)}
          >
            Enviar Comentário
          </button>
        </div>
      )}
    </div>
  );
};

export default LivrosPorGenero;
