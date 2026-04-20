import { useReducer } from "react";

import Input from "./components/Input.tsx";
import Task from "./components/Task.tsx";
import { reducer } from "./handlers/reducerHandler.ts";

const App = () => {
  const [tasks, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <Input addTask={dispatch} />
      {tasks.length > 0 &&
        tasks.map((task) => (
          <Task
            key={task.id}
            taskData={task}
            handler={dispatch}
          />
        ))}
    </div>
  );
};

export default App;
