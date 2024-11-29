import React from "react";
import "./Banner.css";
import banner from "../../assets/banner.png";

const Banner = () => {
  return (
    <div id="banner" className="d-flex">
      <img src={banner} className="img-fluid" alt="" />
      <div>
        <h1>
          <b>REDEV DESENVOLVIMENTOS</b>
        </h1>
        <h4><b>Quem somos e como podemos ajudá-los.</b></h4>
      </div>
    </div>
  );
};

export default Banner;
