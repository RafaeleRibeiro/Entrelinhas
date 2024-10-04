import React from "react";
import { Popover, OverlayTrigger, PopoverBody } from "react-bootstrap";

import "./Categoria.css";

const Categoria = () => {
  const categorias = [
    { name: "Ficção" },
    { name: "Não Ficção" },
    { name: "Infantil" },
    { name: "Romance" },
    { name: "Autoajuda" },
    { name: "Juvenil" },
  ];

  return (
    <div className="icons d-flex mt-4 gap-1">
      {categorias.map((item, index) => (
        <OverlayTrigger
          key={index}
          trigger={["hover", "focus"]}
          placement="bottom"
          overlay={
            <Popover id={`popover-${index}`}>
              <Popover.Header as="h3">{item.name}</Popover.Header>
              {/* <PopoverBody></PopoverBody> */}
            </Popover>
          }
        >
          <div id="bookzinho" className="fs-1">
            <i className="bi bi-book"></i>
          </div>
        </OverlayTrigger>
      ))}
    </div>
  );
};

export default Categoria;
