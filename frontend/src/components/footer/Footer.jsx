import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="pt-5">
      <footer className="footer pt-5">
        {/* <img src="https://placehold.co/200x200" alt=""></img> */}
        <h4>
          <strong>Categories</strong>
        </h4>
        <p></p>
        <h6>Fiction Books</h6>
        <h6>Childrens Books</h6>
        <h6>National Literature</h6>
        <h6>Non-Fiction Books</h6>
        <p></p>

        <div>
          <h5>Agradecemos sua companhia!</h5>

          <a className="btn btn-lg p-3" href="Facebook">
            <i class="bi bi-facebook"></i>
          </a>

          <a className="btn btn-lg p-3" href="Twitter">
            <i class="bi bi-twitter-x"></i>
          </a>

          <a className="btn btn-lg p-3" href="Youtube">
            <i class="bi bi-youtube"></i>
          </a>

          <a className="btn btn-lg p-3" href="Instagram">
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
