import { useEffect, useState } from "react";
import Button from "./components/Button";
import Task from "./components/Task";
import Input from "./components/Input";
import Toast, { handlerToast } from "./components/Toast";
import "./App.css";
import Navbar from "./components/Navbar";
import { createToast } from "./handlers/toastHandler";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState({});
  // const [todos, setTodos] = useState([]);
  // const [currentTodo, setcurrentTodo] = useState(todos.length > 0 ? 0 : -1);

  // const newTodoHandler = (title) => {
  //   const taskTitle = title.trim();

  //   if (taskTitle.length > 2) {
  //     const newTodos = [...todos, { name: taskTitle, tasks: [] }];
  //     setTasks(newTodos);

  //     createToast({ data: "Todo", code: 201 }, setToast);
  //     return true;
  //   }

  //   createToast({ data: "", code: 401 }, setToast);
  // };
  // all commented aren't required for this commit

  const newTaskHandler = (title) => {
    const taskTitle = title.trim();

    if (taskTitle.length > 2) {
      const newTasks = [...tasks, { name: taskTitle, isCompleted: false }];
      setTasks(newTasks);

      createToast({ data: "Task", code: 201 }, setToast);
      return true;
    }

    createToast({ data: "", code: 401 }, setToast);
  };

  const getTask = (e) => e.target.closest(".task");

  const toggleTaskHandler = (e) => {
    const taskElement = getTask(e);
    const task = tasks[taskElement.id];

    task.isCompleted = !task.isCompleted;

    setTasks([...tasks]);
    setToast({ message: "task status changed", type: "success" });
  };

  const removeTaskHandler = (e) => {
    const task = getTask(e);

    tasks.splice(task.id, 1);
    setTasks([...tasks]);
    setToast({ message: "task removed successfully", type: "success" });
  };

  useEffect(() => handlerToast(toast), [toast]);

  return (
    <div>
      {/* <Navbar todos={todos} newTodoHandler={newTodoHandler} /> */
      /*not required for this commit*/}
      <Input handler={newTaskHandler}>Add task</Input>
      {tasks.length > 0 &&
        tasks.map((task, id) => (
          <Task
            task={task}
            key={id}
            id={id}
            handlers={{ toggleTaskHandler, removeTaskHandler }}
          />
        ))}
      {Object.keys(toast).length > 0 && <Toast data={toast} />}
    </div>
  );
};

export default App;
