const d = JSON.parse(Deno.readTextFileSync("pokemon_details.json"));

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

const newF = d.map(({ name, types, weight, base_xp, powers, img }) => ({
  name,
  types,
  stats: {
    weight,
    base_xp,
    "hp": powers.hp,
    "attack": powers.attack,
    "defense": powers.defense,
    "speed": powers.speed,
  },
  url: img,
}));

Deno.writeTextFileSync("data.json", JSON.stringify(newF, null, 2));
