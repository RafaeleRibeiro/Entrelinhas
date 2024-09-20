import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="row justify-content-around align-items-end">
      {/* <img src="https://placehold.co/200x200" alt=""></img> */}
      <div className="col d-none  d-lg-block">
        <h4>
          <strong>Categories</strong>
        </h4>
        <br />
        <h6>Fiction Books</h6>
        <h6>Childrens Books</h6>
        <h6>National Literature</h6>
        <h6>Non-Fiction Books</h6>
      </div>

      <div className="col text-end color-white">
        <h5 className="pe-3">Agradecemos sua companhia!</h5>

        <div>
          <a className="btn btn-lg p-2" href="Facebook">
            <i class="bi bi-facebook"></i>
          </a>

          <a className="btn btn-lg p-2" href="Twitter">
            <i class="bi bi-twitter-x"></i>
          </a>

          <a className="btn btn-lg p-2" href="Youtube">
            <i class="bi bi-youtube"></i>
          </a>

          <a className="btn btn-lg p-2" href="Instagram">
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
