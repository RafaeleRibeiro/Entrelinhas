import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "./StarRating"; // Importa o componente de estrelas
import { Modal, Button } from "react-bootstrap";

const ComentarioModal = ({ googleBooksId }) => {
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0); // Inicializa a nota com 0
  const usuarioId = localStorage.getItem("usuarioId"); // Captura o ID do usuário do localStorage

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

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
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ícone de + para abrir o modal */}
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
                {/* <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Fechar
                    </button> */}
              </div>
            </form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer> */}
        </Modal>

        // <div
        //   className="modal show"
        //   style={{ display: "block" }}
        //   onClick={() => setShowModal(false)}
        // >
        //   <div
        //     className="modal-dialog color-redev"
        //     onClick={(e) => e.preventDefault()}
        //   >
        //     <div id="comentario" className="modal-content">
        //       <div className="modal-header">
        //         <h5 className="modal-title">Adicionar Comentário</h5>
        //         <button
        //           type="button"
        //           className="btn-close"
        //           onClick={() => setShowModal(false)}
        //         ></button>
        //       </div>
        //       <div className="modal-body">
        //         <form onSubmit={handleSubmit}>
        //           <div className="mb-3 d-flex gap-3 justify-content-center align-items-center">
        //             <label>Nota:</label>
        //             {/* Componente de estrelas */}
        //             <StarRating nota={nota} setNota={setNota} />
        //           </div>
        //           <div className="mb-3">
        //             <label>Comentário:</label>
        //             <textarea
        //               className="form-control"
        //               value={comentario}
        //               onChange={handleComentarioChange}
        //               required
        //             />
        //           </div>
        //           <div className="modal-footer d-flex justify-content-center">
        //             <button type="submit" className="btn btn-success">
        //               Enviar Comentário
        //             </button>
        //             {/* <button
        //               type="button"
        //               className="btn btn-secondary"
        //               onClick={() => setShowModal(false)}
        //             >
        //               Fechar
        //             </button> */}
        //           </div>
        //         </form>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default ComentarioModal;
