import { createContext, useContext, type ActionDispatch } from "react";
import type { ActionProps, Task } from "../types";

export const TodoContext = createContext<Task[] | null>(null);

export const TodoDispatchContext = createContext<ActionDispatch<[action: ActionProps]> | null>(null);

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const useTodoDispatchContext = () => {
  return useContext(TodoDispatchContext);
};
