const Task = ({ taskData: { title, isDone } }: TaskProps) => (
  <div>
    <span>
      {!isDone ? "❌" : "✅"}
      {title}
    </span>

    <span>
      <button>Toggle</button>
      <button>Remove</button>
    </span>
  </div>
);

type Task = {
  title: string;
  isDone: boolean;
};

type TaskProps = {
  taskData: Task;
};

const App = () => {
  const taskData: Task = { title: "ride to ladakh", isDone: false };

  return (
    <div>
      <Task taskData={taskData} />
    </div>
  );
};

export default App;
