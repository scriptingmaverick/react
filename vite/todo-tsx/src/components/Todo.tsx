import Task from "./Task";
import type { ActionProps, Task as Structure } from "../types";
import { useTodoContext, useTodoDispatchContext } from "../context/todoContext";
import type { ActionDispatch } from "react";

const Todo = () => {
  const tasks = useTodoContext() as Structure[];

  if (tasks.length === 0) return <h1>No tasks available</h1>;

  const dispatch = useTodoDispatchContext() as ActionDispatch<
    [action: ActionProps]
  >;

  return (
    tasks.map((task) => (
      <Task
        key={task.id}
        taskData={task}
        handler={dispatch}
      />
    ))
  );
};

export default Todo;
