import React, { useState } from "react";

const StarRating = ({ nota, setNota }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setNota(ratingValue)}
              style={{ display: "none" }} // Esconder input de rádio
            />
            <i
              className={`bi ${
                ratingValue <= (hover || nota) ? "bi-star-fill" : "bi-star"
              }`}
              style={{
                fontSize: "30px",
                color: ratingValue <= (hover || nota) ? "#ffc107" : "#e4e5e9",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            ></i>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
