import React from "react";
import { Link } from "react-router-dom";

const Generos = () => {
  // Definimos o array de categorias fixo
  const generos = [
    { name: "Ficção" },
    { name: "Não Ficção" },
    { name: "Infantil" },
    { name: "Romance" },
    { name: "Autoajuda" },
    { name: "Juvenil" },
  ];

  return (
    <div className="container mt-4">
      <h2>Gêneros de Livros</h2>
      <ul className="list-group">
        {generos.map((genero, index) => (
          <li key={index} className="list-group-item">
            <Link to={`/generos/${genero.name}`}>{genero.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Generos;
