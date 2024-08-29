import { useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";
import Header from "./components/header/Header";
import Info from "./components/info/info";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Info />
    </>
  );
}

export default App;
