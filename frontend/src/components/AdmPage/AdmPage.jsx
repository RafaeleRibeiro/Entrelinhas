import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./AdmPage.css";

function App() {
  return (
    <div className="h-100 mt-5">
      <div className="container text-center h-100">
        <h1 className="my-4 title">Gerenciamento</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-5 pt-0 pt-md-5">
          <Card title="Clientes" icon="bi-person" link="/clientes" />
          {/* <Card title="Estoque" icon="bi-box-seam" link="/estoque" /> */}
          <Card title="Produtos" icon="bi-journal" link="/produtos" />
          {/* <Card title="Faturamento" icon="bi-graph-up" link="/faturamento" /> */}
          <Card
            title="Fornecedores"
            icon="bi-person-plus"
            link="/fornecedores"
          />
          {/* <Card
            title="Pagamentos"
            icon="bi-currency-dollar"
            link="/pagamentos"
          /> */}
          {/* <Card title="Vendas" icon="bi-gear" link="/vendas" /> */}
          <Card
            title="Melhores Produtos"
            icon="bi-star"
            link="/melhores-produtos"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, link }) {
  return (
    <div className="col">
      <a href={link} className="text-decoration-none">
        <div className="card h-100 card-custom d-flex justify-content-center align-items-center">
          <div className="card-body">
            <i className={`bi ${icon} card-icon mb-3`}></i>
            <p className="card-text">{title}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default App;
