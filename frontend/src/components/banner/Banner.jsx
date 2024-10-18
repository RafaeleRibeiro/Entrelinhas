import React from "react";
import "./Banner.css";
import banner from "../../assets/banner.png";

const Banner = () => {
  return (
    <div
      id="banner"
      className="d-flex justify-content-center align-items-center"
    >
      <img src={banner} className="img-fluid" alt="" />
    </div>
  );
};

export default Banner;
