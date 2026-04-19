import { useEffect, useState } from "react";

const Search = ({ handler }) => {
  const [input, setInput] = useState("");

  const changeHandler = (e) => setInput(e.target.value);

  useEffect(() => handler(input), [input]);

  return (
    <div id="search-div">
      <input
        id="search-bar"
        type="text"
        onChange={changeHandler}
        placeholder="Search pokemon"
      />
    </div>
  );
};

export default Search;
