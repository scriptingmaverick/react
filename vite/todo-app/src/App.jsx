import React, { useState } from "react";

const Todo = ({ tasks }) => tasks.map((task, idx) => <li key={idx}>task</li>);

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const taskName = prompt("enter task name: ");

    setTasks(tasks.push(taskName));
  };

  return (
    <div>
      tasks.length && <Todo tasks={tasks} addTask={addTask} />
    </div>
  );
};

export default App;
