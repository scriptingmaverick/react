import { type ReactElement, useReducer } from "react";
import { TodoContext, TodoDispatchContext } from "./todoContext.ts";
import { reducer } from "../handlers/reducerHandler.ts";

const TodoProvider = ({ children }: { children: ReactElement[] }) => {
  const [tasks, dispatch] = useReducer(reducer, []);

  return (
    <TodoContext value={tasks}>
      <TodoDispatchContext value={dispatch}>
        {children}
      </TodoDispatchContext>
    </TodoContext>
  );
};

export default TodoProvider;
