import { useState } from "react";

const Task = ({ taskData: { title, isDone, id }, toggler }: TaskProps) => (
  <div>
    <span>
      {!isDone ? "❌" : "✅"}
      {title}
    </span>

    <span>
      <button onClick={() => toggler(id)}>Toggle</button>
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

  return (
    <div>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <Task key={task.id} taskData={task} toggler={handleToggle} />
        ))}
    </div>
  );
};

export default App;
