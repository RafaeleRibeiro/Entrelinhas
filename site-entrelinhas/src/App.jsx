import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Entrelinhas</h1>
      <h2>Duda Feliz</h2>
      <h2>Rafa Dark</h2>
    </>
  );
}

export default App;
