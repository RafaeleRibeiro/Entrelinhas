import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "./StarRating"; // Importa o componente de estrelas
import { Modal, Button } from "react-bootstrap";

const ComentarioModal = ({ googleBooksId }) => {
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0); // Inicializa a nota com 0
  const usuarioId = localStorage.getItem("usuarioId"); // Captura o ID do usuário do localStorage

  const [showModal, setShowModal] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState([]); // Estado para armazenar avaliações

  const handleCloseModal = () => setShowModal(false);

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  // Função para buscar avaliações da API
  const fetchAvaliacoes = async () => {
    const apiUrl = "https://redev.somee.com/api/Avaliacoes"; // URL da API para obter as avaliações

    try {
      const response = await axios.get(apiUrl);
      setAvaliacoes(response.data); // Atualiza o estado com as avaliações obtidas
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  // Chamada à API para buscar as avaliações quando o componente é montado
  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://redev.somee.com/api/Avaliacoes"; // URL da API para criar o comentário

    try {
      const response = await axios.post(apiUrl, {
        usuariosId: usuarioId, // ID do usuário autenticado
        googleBooksId: "00000", // ID do livro do Google
        nota: nota, // Nota do rating por estrelas
        comentario: comentario,
      });

      console.log("Comentário criado:", response.data);
      setComentario("");
      setNota(0);
      setShowModal(false); // Fecha o modal após enviar o comentário

      // Recarregar as avaliações após adicionar um novo comentário
      fetchAvaliacoes();
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* Renderiza as avaliações acima do botão */}

        <div className="mb-3 d-flex w-100 justify-content-around">
          {avaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className=" mb-2">
              <h2>{avaliacao.usuario}</h2>
              {/* Use a nota para exibir estrelas */}
              <p>{avaliacao.comentario}</p>
              {/* <small>Usuário: {avaliacao.usuariosId}</small> */}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4 className="button-title align-content-center">
          Adicione sua avaliação e comentário!
        </h4>
        <button
          className="btn btn-primary bg-transparent"
          onClick={() => setShowModal(true)}
          style={{ fontSize: "50px", borderRadius: "50%", padding: "10px" }}
        >
          +
        </button>

        {/* Modal do Bootstrap */}
        {showModal && (
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Comentário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex gap-3 justify-content-center align-items-center">
                  <label>Nota:</label>
                  {/* Componente de estrelas */}
                  <StarRating nota={nota} setNota={setNota} />
                </div>
                <div className="mb-3">
                  <label>Comentário:</label>
                  <textarea
                    className="form-control"
                    value={comentario}
                    onChange={handleComentarioChange}
                    required
                  />
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="submit" className="btn btn-success">
                    Enviar Comentário
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ComentarioModal;
