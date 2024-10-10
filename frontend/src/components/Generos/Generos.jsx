import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Generos = () => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar livros e extrair gêneros únicos
  const fetchLivros = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=subject"
      );
      const livros = response.data.items;

      // Extrai as categorias (gêneros) de cada livro e remove duplicatas
      const categorias = [];
      livros.forEach((livro) => {
        if (livro.volumeInfo.categories) {
          categorias.push(...livro.volumeInfo.categories);
        }
      });

      const categoriasUnicas = [...new Set(categorias)];
      setGeneros(categoriasUnicas);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  if (loading) return <p>Carregando gêneros...</p>;

  return (
    <div className="container mt-4">
      <h2>Gêneros de Livros</h2>
      <ul className="list-group">
        {generos.map((genero, index) => (
          <li key={index} className="list-group-item">
            <Link to={`/generos/${genero}`}>{genero}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Generos;
