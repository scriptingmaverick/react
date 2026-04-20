import { useState } from "react";
import { type ActionProps, Actions } from "../types";

const Input = ({ addTask }: { addTask: (action: ActionProps) => void }) => {
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
