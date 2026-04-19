import Image from "./Image.jsx";
import Stats from "./Stats.jsx";
import Types from "./Types.jsx";

import pokemonData from "../assets/poki-data.json" with { type: "json" };

const PokemonPage = ({ currentType, searchable }) => {
  let filteredPokemon = pokemonData[currentType];
  if (searchable) {
    filteredPokemon = filteredPokemon.filter(({ name }) =>
      name.startsWith(searchable),
    );
  }

  console.log({ searchable });

  return (
    <>
      {filteredPokemon.length > 0 ? (
        filteredPokemon.map((pokemon, id) => (
          <a key={id} className="card">
            <Image url={pokemon?.imageUrl} name={pokemon.name} />

            <div className="content flex flex-col">
              <div className="header width-100 flex height-fit justify-between">
                <div className="name">{pokemon.name}</div>
                <Types types={pokemon.types} />
              </div>

              <Stats stats={pokemon.stats} />
            </div>
          </a>
        ))
      ) : (
        <h2>No pokemons available</h2>
      )}
    </>
  );
};

export default PokemonPage;
