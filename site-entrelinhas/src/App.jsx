import { useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";
import Header from "./components/header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
