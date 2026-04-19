import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Task from "./components/Task";
import Input from "./components/Input";
import Toast from "./components/Toast";
import "./App.css";
import Navbar from "./components/Navbar";
import { createToast, toastHandler } from "./handlers/toastHandler";
import { getTask, getTodo } from "./handlers/utils";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState({});
  const [todos, setTodos] = useState([]);
  const [currentTodo, setcurrentTodo] = useState(todos.length > 0 ? 0 : -1);

  const newTodoHandler = (title) => {
    const taskTitle = title.trim();

    if (taskTitle.length > 2) {
      const newTodos = [...todos, { name: taskTitle, tasks: [] }];
      setTodos(newTodos);

      createToast({ data: "Todo", code: 201 }, setToast);
      return true;
    }

    createToast({ data: "", code: 401 }, setToast);
  };

  const editHandler = (input) => {
    if (input.value.length < 2)
      return createToast({ data: "", code: 401 }, setToast);

    input.classList.remove("active");
    input.setAttribute("readonly", true);
    input.removeEventListener("keydown", keyDownListener);
    input.removeEventListener("click", editTodoHandler);

    setTodos([...todos]);

    createToast({ data: "Todo", code: 202 }, setToast);
  };

  const keyDownListener = (e) => e.keyCode === 13 && editHandler(e.target);

  const editTodoHandler = (e) => {
    const todo = e.target.closest(".todo");
    const input = todo.getElementsByTagName("input")[0];

    input.removeAttribute("readonly");
    input.classList.add("active");
    input.placeholder = input.value;
    input.value = "";

    input.focus();
    input.addEventListener("keydown", keyDownListener);
  };

  const removeTodoHandler = (e) => {
    const todo = getTodo(e);
    todos.splice(todo.id, 1);

    setTodos([...todos]);
    createToast({ data: "Todo", code: 204 }, setToast);
  };

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

  const toggleTaskHandler = (e) => {
    const taskElement = getTask(e);
    const task = tasks[taskElement.id];

    task.isCompleted = !task.isCompleted;

    setTasks([...tasks]);
    createToast({ data: "", code: "202-status" }, setToast);
  };

  const removeTaskHandler = (e) => {
    const task = getTask(e);

    tasks.splice(task.id, 1);
    setTasks([...tasks]);
    createToast({ data: "Task", code: 204 }, setToast);
  };

  const handlers = { editTodoHandler, newTodoHandler, removeTodoHandler };

  useEffect(() => toastHandler(toast), [toast]);

  return (
    <div>
      <Navbar todos={todos} handlers={handlers} />
      {/* <Input handler={newTaskHandler}>Add task</Input>
      {tasks.length > 0 &&
        tasks.map((task, id) => (
          <Task
            task={task}
            key={id}
            id={id}
            handlers={{ toggleTaskHandler, removeTaskHandler }}
          />
        ))} */}
      {Object.keys(toast).length > 0 && <Toast data={toast} />}
    </div>
  );
};

export default App;
