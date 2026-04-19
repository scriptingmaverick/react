import { useState } from "react";

const Input = ({ type = "text", name, children, handler }) => {
  const [input, setInput] = useState("");

  const keyDownHandler = (e) =>
    e.keyCode === 13 && handler(input) && setInput("");

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <input
      type={type}
      name={name}
      placeholder={children}
      value={input}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
    />
  );
};

export default Input;
