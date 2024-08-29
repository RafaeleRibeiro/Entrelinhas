import React from "react";
import "./Banner.css";
import banner from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="d-flex">
      <img src={banner} className="img-fluid" alt="" />
      <div>
        <h1>
          <b>REDEV DESENVOLVIMENTOS</b>
        </h1>
        <h4>Quem somos e como podemos ajudá-los.</h4>
      </div>
    </div>
  );
};

export default Banner;
