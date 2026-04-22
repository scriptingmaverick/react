import { type ActionDispatch, useState } from "react";
import { type ActionProps, Actions } from "../types";
import { useTodoDispatchContext } from "../context/todoContext";

const Input = () => {
  const addTask = useTodoDispatchContext() as ActionDispatch<
    [action: ActionProps]
  >;
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = input;
        setInput("");
        addTask({ type: Actions.ADD_TASK, title });
      }}
    >
      <input
        type="text"
        name="task"
        value={input}
        id="task-name"
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default Input;
