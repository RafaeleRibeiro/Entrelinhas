import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erros

  const searchBooks = async () => {
    setLoading(true); // Ativa o estado de carregamento
    setError(null); // Reseta o erro
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = response.data.docs.map((book) => ({
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown Author",
        coverId: book.cover_i,
      }));
      setBooks(data);
    } catch (error) {
      setError("Erro ao buscar os livros."); // Define a mensagem de erro
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div>
      <h1>Buscar Livros</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome do livro"
      />
      <button onClick={searchBooks}>Buscar</button>
      {loading && <p>Carregando...</p>} {/* Indicador de carregamento */}
      {error && <p>{error}</p>} {/* Mostra erro caso ocorra */}
      <div>
        {books.map((book, index) => (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {book.coverId ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                alt={`Capa do livro ${book.title}`}
              />
            ) : (
              <p>Sem capa disponível</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
