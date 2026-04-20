import { useState } from "react";

const Task = (
  { taskData: { title, isDone, id }, toggler, remover }: TaskProps,
) => (
  <div>
    <span>
      {!isDone ? "❌" : "✅"}
      {title}
    </span>

    <span>
      <button onClick={() => toggler(id)}>Toggle</button>
      <button onClick={() => remover(id)}>Remove</button>
    </span>
  </div>
);

type Task = {
  title: string;
  isDone: boolean;
  id: number;
};

type TaskProps = {
  taskData: Task;
  toggler: (id: number) => void;
  remover: (id: number) => void;
};

const App = () => {
  const tasksData: Task[] = [{
    id: 1,
    title: "ride to ladakh",
    isDone: false,
  }, {
    id: 2,
    title: "ride to montesore",
    isDone: false,
  }];

  const [tasks, setTasks] = useState<Task[]>(tasksData);

  const handleToggle = (taskId: number): void => {
    const task = tasks.find(({ id }) => id === taskId) as Task;
    task.isDone = !task.isDone;

    setTasks([...tasks]);
  };

  const handleRemove = (taskId: number): void => {
    const newTasks = tasks.filter(({ id }) => id !== taskId);

    setTasks([...newTasks]);
  };

  return (
    <div>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <Task
            key={task.id}
            taskData={task}
            toggler={handleToggle}
            remover={handleRemove}
          />
        ))}
    </div>
  );
};

export default App;
