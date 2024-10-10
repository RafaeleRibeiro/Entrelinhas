import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LivrosPorGenero = () => {
  const { genero } = useParams(); // Obtém o gênero da URL
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0); // Controle para carregar mais livros
  const [hasMore, setHasMore] = useState(true);

  // Função para buscar os livros por categoria
  const fetchLivrosPorGenero = async (startIndex) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genero}&startIndex=${startIndex}&maxResults=10`
      );
      const novosLivros = response.data.items;
      setLivros((prevLivros) => [...prevLivros, ...novosLivros]);
      setLoading(false);

      if (novosLivros.length < 10) {
        setHasMore(false); // Se menos de 10 livros forem retornados, significa que não há mais livros para carregar
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivrosPorGenero(startIndex);
  }, [startIndex, genero]);

  // Função que detecta o fim da página e carrega mais livros
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMore
    ) {
      return;
    }
    setStartIndex((prevStartIndex) => prevStartIndex + 10); // Incrementa o startIndex para carregar os próximos livros
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  if (loading && livros.length === 0) return <p>Carregando livros...</p>;

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
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Carregando mais livros...</p>}
      {!hasMore && <p>Não há mais livros para carregar.</p>}
    </div>
  );
};

export default LivrosPorGenero;
