import { useState } from "react";

const Task = ({ taskData: { title, isDone }, toggler }: TaskProps) => (
  <div>
    <span>
      {!isDone ? "❌" : "✅"}
      {title}
    </span>

    <span>
      <button onClick={toggler}>Toggle</button>
    </span>
  </div>
);

type Task = {
  title: string;
  isDone: boolean;
};

type TaskProps = {
  taskData: Task;
  toggler: () => void;
};

const App = () => {
  const [task, setTask] = useState<Task>({
    title: "ride to ladakh",
    isDone: false,
  });

  const handleToggle = () => setTask({ ...task, isDone: !task.isDone });

  return (
    <div>
      {task && <Task taskData={task} toggler={handleToggle} />}
    </div>
  );
};

export default App;
