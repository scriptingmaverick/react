import { useState } from "react";
import "./App.css";
import PokemonPage from "./components/Pokemon.jsx";
import Navbar from "./components/Navbar.jsx";
import { types } from "./assets/types-info.js";

const App = () => {
  const [currentType, setCurrentType] = useState("grass");

  const typeClickHandler = (e) => {
    setCurrentType(e.target.textContent);
  };

  return (
    <div className="flex width-100 heigth-100">
      <Navbar
        types={types}
        currentType={currentType}
        handleClick={typeClickHandler}
      />

      <main className="container flex flex-wrap overflow-scroll width-80">
        <PokemonPage currentType={currentType} />
      </main>
    </div>
  );
};

export default App;
