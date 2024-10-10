import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        // Adicionando o parâmetro langRestrict para buscar apenas livros em português
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=best&maxResults=6&key=AIzaSyDka6MZEKG4ioCsydhv_Uyv_v1_zviHH7E"
        );
        const data = response.data.items.map((item) => ({
          title: item.volumeInfo.title,
          publisher: item.volumeInfo.publisher || "Desconhecida",
          category: item.volumeInfo.categories
            ? item.volumeInfo.categories[0]
            : "Não categorizado",
          publishedDate: item.volumeInfo.publishedDate || "Data desconhecida",
          description:
            item.volumeInfo.description || "Sem descrição disponível.",
          cover: item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.thumbnail
            : null,
        }));
        setBooks(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchPopularBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      {/* <h1 className="text-center">Livros Populares</h1> */}
      <div className="row justify-content-center align-items-center">
        {books.map((book, index) => (
          <div
            id="cover"
            className="col-md-4 mt-3 mb-5 d-flex justify-content-center"
            key={index}
          >
            <div className="">
              <img
                src={book.cover}
                className="card object-fit-cover"
                alt={`Capa do livro ${book.title}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleBookClick(book)}
              />
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedBook.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={selectedBook.cover}
                  alt={`Capa do livro ${selectedBook.title}`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-8">
                <h4>{selectedBook.title}</h4>
                <p>
                  <strong>Editora:</strong> {selectedBook.publisher}
                </p>
                <p>
                  <strong>Categoria:</strong> {selectedBook.category}
                </p>
                <p>
                  <strong>Data de publicação:</strong>{" "}
                  {selectedBook.publishedDate}
                </p>
                <p>
                  <a
                    href={`https://lista.mercadolivre.com.br/${selectedBook.title}`}
                  >
                    COMPRE AQUI
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h5>Descrição</h5>
              <p>{selectedBook.description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default App;
