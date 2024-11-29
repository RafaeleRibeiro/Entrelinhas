import React from "react";
import "./Header.css";
import logo from "../../assets/logo3.png";

const Header = () => {
  return (
    <>
      <div className="d-flex justify-content-start header gap-3 p-3">
        <img src={logo} alt="" />
        <h1 className="">
          <b>REDEV DESENVOLVIMENTOS</b>
        </h1>
        {/* <ion-icon name="call-outline"></ion-icon>
        <ion-icon name="mail-outline"></ion-icon> */}
      </div>
      <div className="bg-secondary d-flex justify-content-around">
        <a className="btn btn-danger btn-lg p-3" href="#SobreNos">
          Sobre nós
        </a>
        <a className="btn btn-danger btn-lg p-3" href="#NossosServicos">
          Nossos Serviços
        </a>
        <a className="btn btn-danger btn-lg p-3" href="#">
          Entrelinhas
        </a>
      </div>
    </>
  );
};

export default Header;
