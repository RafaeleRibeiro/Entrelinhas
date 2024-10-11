import React from "react";
import Header from "../header/Header";
import Banner from "../banner/Banner";
import Categoria from "../categorias/Categoria";
import Livros from "../../Livros";
import Comentario from "../comentario/Comentario";
import Footer from "../footer/Footer";
import ClientesList from "../ListaCliente/ClientesList";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Categoria />
      <Livros />
      <Comentario />
      <Footer />
    
    </div>
  );
};

export default Home;
