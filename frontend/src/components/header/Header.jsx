import React from "react";
import "./Header.css";
import logo from "../../assets/Logo.png"; 

const Header = () => {
  return (
    <>
      <div className="d-flex justify-content-start header gap-3 p-3">
        <img src={logo} alt="" />
      </div>

      <div className="bg-secondary d-flex justify-content-around">

        <a className="btn btn-lg p-3" href="#">
        <i class="bi bi-person"></i>
        </a>

        <a className="btn btn-lg p-3" href="#">
          <i class="bi bi-cart-plus"></i>
        </a>

      </div>
    </>
  );
};

export default Header;
