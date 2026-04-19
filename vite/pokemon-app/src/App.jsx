import { useState } from "react";
import "./App.css";
import PokemonPage from "./components/Pokemon.jsx";
import Navbar from "./components/Navbar.jsx";
import { types } from "./assets/types-info.js";
import Search from "./components/Search.jsx";

const App = () => {
  const [currentType, setCurrentType] = useState("all");
  const [searchable, setSearchable] = useState("");

  const typeClickHandler = (e) => setCurrentType(e.target.textContent);

  const searchHandler = (pokemon) => setSearchable(pokemon);

  return (
    <div className="flex width-100 heigth-100">
      <Navbar
        types={types}
        currentType={currentType}
        handleClick={typeClickHandler}
      />

      <main className="container flex flex-wrap overflow-scroll width-80">
        <Search handler={searchHandler} />
        <PokemonPage currentType={currentType} searchable={searchable} />
      </main>
    </div>
  );
};

export default App;
