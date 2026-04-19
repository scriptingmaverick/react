import { useState } from "react";

const Input = ({
  type = "text",
  name,
  children,
  handler: submitHandler,
  className = "",
  readonly = false,
  canBePlaceholder,
}) => {
  const [input, setInput] = useState(!canBePlaceholder ? children : "");

  const keyDownHandler = (e) =>
    e.keyCode === 13 && submitHandler && submitHandler(input) && setInput("");

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={canBePlaceholder ? children : ""}
      value={input}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
      readOnly={readonly}
    />
  );
};

export default Input;
