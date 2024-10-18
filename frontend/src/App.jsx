import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import Generos from "./components/Generos/Generos";
import LivrosPorGenero from "./components/LivrosPorGenero/LivrosPorGenero";
import ClientesList from "./components/ListaCliente/ClientesList";
import FornecedoresList from "./components/ListaFornecedores/FornecedoresList.jsx";
import Home from "./components/home/Home";
import AdmPage from "./components/AdmPage/AdmPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/generos/:genero" element={<LivrosPorGenero />} />
        <Route path="/login" element={<Login />} /> {/* Rota para login */}
        <Route path="/Clientes" element={<ClientesList />} />
        <Route path="/fornecedores" element={<FornecedoresList />} />
        <Route path="/AdmPage" element={<AdmPage />} />
      </Routes>
    </>
  );
}

export default App;
