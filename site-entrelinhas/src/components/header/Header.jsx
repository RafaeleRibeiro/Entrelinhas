import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <>
      <div className="text-center d-flex header justify-content-center">
        <img src={logo} alt="" />
        <h1 className="">REDEV DESENVOLVIMENTOS</h1>
        {/* <ion-icon name="call-outline"></ion-icon>
        <ion-icon name="mail-outline"></ion-icon> */}
      </div>
      <div className="bg-secondary d-flex justify-content-around">
        <a className="btn btn-danger btn-lg" href="#">
          Sobre nós
        </a>
        <a className="btn btn-danger btn-lg" href="#">
          Nossos Serviços
        </a>
        <a className="btn btn-danger btn-lg" href="#">
          Entrelinhas
        </a>
      </div>
    </>
  );
};

export default Header;
