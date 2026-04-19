import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Task from "./components/Task";
import Input from "./components/Input";
import Toast from "./components/Toast";
import "./App.css";
import Navbar from "./components/Navbar";
import { createToast, toastHandler } from "./handlers/toastHandler";
import { getTodo } from "./handlers/utils";
import Tasks from "./components/Tasks";

const App = () => {
  const [toast, setToast] = useState({});
  const [todos, setTodos] = useState([]);
  const [currentTodoId, setcurrentTodoId] = useState(todos.length > 0 ? 0 : -1);

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
    const newTodos = todos.filter((_, i) => i !== todo.id);

    setTodos(newTodos);
    createToast({ data: "Todo", code: 204 }, setToast);
  };

  const selectTodoHandler = (e) => setcurrentTodoId(getTodo(e).id);

  const handlers = {
    editTodoHandler,
    newTodoHandler,
    removeTodoHandler,
    selectTodoHandler,
  };

  useEffect(() => toastHandler(toast), [toast]);

  useEffect(() => setcurrentTodoId(todos.length - 1), [todos]);

  console.log(currentTodoId)

  return (
    <div id="main">
      <Navbar todos={todos} handlers={handlers} currentTodoId={currentTodoId} />
      <Tasks
        key={currentTodoId}
        currentTodo={todos[currentTodoId]}
        todos={todos}
        setToast={setToast}
        setTodos={setTodos}
      />
      {Object.keys(toast).length > 0 && <Toast data={toast} />}
    </div>
  );
};

export default App;
