import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ComentarioModal = ({ googleBooksId }) => {
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const usuarioId = localStorage.getItem("usuarioId"); // Captura o ID do usuário do localStorage

  const [showModal, setShowModal] = useState(false);

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleNotaChange = (e) => {
    setNota(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://redev.somee.com/api/Avaliacoes"; // URL da API para criar o comentário

    try {
      const response = await axios.post(apiUrl, {
        usuariosId: usuarioId, // ID do usuário autenticado
        googleBooksId: googleBooksId, // ID do livro do Google
        nota: nota,
        comentario: comentario,
      });

      console.log("Comentário criado:", response.data);
      setComentario("");
      setNota(0);
      setShowModal(false); // Fecha o modal após enviar o comentário
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  return (
    <div>
      {/* Ícone de + para abrir o modal */}
      <button
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
        style={{ fontSize: "24px", borderRadius: "50%", padding: "10px" }}
      >
        +
      </button>

      {/* Modal do Bootstrap */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Comentário</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nota:</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={nota}
                      onChange={handleNotaChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comentário:</label>
                    <textarea
                      value={comentario}
                      onChange={handleComentarioChange}
                      className="form-control"
                      rows="3"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enviar Comentário
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComentarioModal;
