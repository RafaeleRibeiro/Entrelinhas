import React from "react";
import "./Footer.css";
import logo3 from "../../assets/logo3.png";

export const Footer = () => {
  return (
    <div className="pt-5">
      <footer className="footer pt-5">
        <img src={logo3} alt=""></img>
        <h4>
          <strong>
            Entre em contato com nossa equipe e não perca a oportunidade de
            fazer seu projeto sair do papel!
          </strong>
        </h4>
        <p></p>
        <h5>REDevdesenvolvimentos@clientes.com </h5>
        <p></p>
        <h5>16-2887-5301</h5>
       
      </footer>
    </div>
  );
};

export default Footer;
