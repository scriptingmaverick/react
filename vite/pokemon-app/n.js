// const d = JSON.parse(Deno.readTextFileSync("./src/assets/poki-data.json"));
import data from "./src/assets/poki-data.json" with { type: "json" };

const newdata = Object.values(
  Object.values(data)
    .reduce((mainData, type) => mainData.push(...type) && mainData, [])
    .reduce(
      (distinctData, pokemon) =>
        (distinctData[pokemon.id] = pokemon) && distinctData,
      {},
    ),
);
const mainData = { ...data, all: newdata };

// {
//   "name": "bulbasaur",
//   "types": [
//     "grass",
//     "poison"
//   ],
//   "weight": 69,
//   "base_xp": 64,
//   "powers": {
//     "hp": 45,
//     "attack": 49,
//     "defense": 49,
//     "special-attack": 65,
//     "special-defense": 65,
//     "speed": 45
//   },
//   "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
// },

// const f = JSON.parse(d);
// console.log(d);

// const newF = d.map(({ name, types, weight, base_xp, powers, img }) => ({
//   name,
//   types,
//   stats: {
//     weight,
//     base_xp,
//     hp: powers.hp,
//     attack: powers.attack,
//     defense: powers.defense,
//     speed: powers.speed,
//   },
//   url: img,
// }));

Deno.writeTextFileSync(
  "./src/assets/poki-data.json",
  JSON.stringify(mainData, null, 2),
);
