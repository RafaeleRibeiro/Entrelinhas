import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap";

import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Banner from "./components/banner/Banner";
import Categoria from "./components/categorias/Categoria";
import Books from "./Books";
import Livros from "./Livros";
import Login from "./components/login/Login";
import Comentario from "./components/comentario/Comentario";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <Categoria />
      <Livros />
      <Comentario />
      <Footer />

      {/* <Login /> */}
    </>
  );
}

export default App;
