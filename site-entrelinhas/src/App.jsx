import { useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";
import Header from "./components/header/Header";
import Info from "./components/info/Info";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Banner />
      <Info />
      <Footer />
    </>
  );
}

export default App;
