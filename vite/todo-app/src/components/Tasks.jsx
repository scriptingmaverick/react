import { useEffect, useState } from "react";
import { createToast } from "../handlers/toastHandler";
import Task from "./Task";
import Input from "./Input";
import { getTask } from "../handlers/utils";

const Tasks = ({ currentTodo, todos, setTodos, setToast }) => {
  console.log(currentTodo);
  const [tasks, setTasks] = useState(currentTodo?.tasks || []);

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

  const toggleTaskHandler = (taskId) => {
    const task = tasks[taskId];

    task.isCompleted = !task.isCompleted;

    setTasks([...tasks]);
    createToast({ data: "", code: "202-status" }, setToast);
  };

  const removeTaskHandler = (taskId) => {
    tasks.splice(taskId, 1);
    setTasks([...tasks]);
    createToast({ data: "Task", code: 204 }, setToast);
  };

  useEffect(() => {
    currentTodo && (currentTodo.tasks = tasks);
  }, [tasks]);

  useEffect(() => setTodos(todos), [currentTodo]);

  return (
    <div id="tasks-component">
      {currentTodo
        ? (
          <>
            <Input handler={newTaskHandler} canBePlaceholder={true}>
              Add task
            </Input>
            <div id="tasks-container">
              <h1>Tasks</h1>
              <div id="tasks">
                {tasks.length > 0
                  ? (
                    tasks.map((task, id) => (
                      <Task
                        task={task}
                        key={id}
                        id={id}
                        handlers={{ toggleTaskHandler, removeTaskHandler }}
                      />
                    ))
                  )
                  : (
                    <>
                      <h1>No tasks available</h1>
                    </>
                  )}
              </div>
            </div>
          </>
        )
        : (
          <>
            <h1>todo data is not available</h1>
          </>
        )}
    </div>
  );
};

export default Tasks;
