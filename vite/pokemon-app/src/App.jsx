import "./App.css";

const PokemonTypes = (props) => (
  <div className="types width-50 flex justify-end">
    {props.types.map((type, id) => <span key={id} className={type}>{type}
    </span>)}
  </div>
);

const PokemonStats = (props) => {
  return (
    <div className="stats width-100 flex height-70 flex-col">
      {Object.entries(props.stats).map(([key, value], id) => (
        <div key={id} className="stat flex justify-between">
          <span className="name">{key}</span>
          <span className="value">{value}</span>
        </div>
      ))}
    </div>
  );
};

const Image = ({ url, name }) => (
  <div className="img-container width-100 flex justify-center">
    <img
      src={url}
      alt={name}
      className="width-80 height-100"
    />
  </div>
);

const Pokemon = ({ data: pokemon }) => (
  <div className="card">
    <Image url={pokemon.url} name={pokemon.name} />
    <div className="content flex flex-col">
      <div className="header width-100 flex height-fit justify-between">
        <div className="name">{pokemon.name}</div>
        <PokemonTypes
          types={pokemon.types}
        />
      </div>

      <PokemonStats
        stats={pokemon.stats}
      />
    </div>
  </div>
);

const App = () => {
  const bulbasaur = {
    name: "Bulbasaur",
    id: 1,
    stats: {
      "BASE_XP": 64,
      "hp": 60,
      "attack": 50,
      "defense": 65,
      "speed": 45,
    },
    "types": [
      "grass",
      "poison",
    ],
    "url":
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  };

  const pokemon = Array.from({ length: 10 }).map((_) => bulbasaur);

  return (
    <div className="container flex flex-wrap overflow-scroll width-60">
      {pokemon.map((data, id) => <Pokemon key={id} data={data} />)}
    </div>
  );
};
export default App;
