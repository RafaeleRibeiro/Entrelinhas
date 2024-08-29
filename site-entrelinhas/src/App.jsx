import { useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";
import Header from "./components/header/Header";
import Info from "./components/info/info";
import Banner from "./components/banner/Banner";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Banner />
      <Info />
    </>
  );
}

export default App;
