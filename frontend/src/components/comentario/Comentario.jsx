import React, { useState } from "react";
import axios from "axios";

const Comentario = ({ googleBooksId }) => {
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const usuarioId = localStorage.getItem("usuarioId"); // Captura o ID do usuário do localStorage

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleNotaChange = (e) => {
    setNota(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://redev.somee.com/api/Avaliacoes"; // API para criar o comentário

    try {
      const response = await axios.post(apiUrl, {
        // avaliacaoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Geração de ID para avaliação
        usuariosId: usuarioId, // ID do usuário autenticado
        googleBooksId: googleBooksId, // ID do livro do Google
        nota: nota,
        comentario: comentario,
      });

      console.log("Comentário criado:", response.data);
      // Aqui você pode limpar o formulário ou atualizar o estado conforme necessário
      setComentario("");
      setNota(0);
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      console.log("Id do Usuario:", usuarioId);
    }
  };

  return (
    <div className="comentario-container">
      <h3>Adicionar Comentário</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nota:</label>
          <input
            type="number"
            min="0"
            max="5"
            value={nota}
            onChange={handleNotaChange}
            required
          />
        </div>
        <div>
          <label>Comentário:</label>
          <textarea
            value={comentario}
            onChange={handleComentarioChange}
            required
          />
        </div>
        <button type="submit">Enviar Comentário</button>
      </form>
    </div>
  );
};

export default Comentario;
