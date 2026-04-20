import { produce } from "immer";
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

const Input = ({ addTask }: { addTask: (action: ActionProps) => void }) => {
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = input;
        setInput("");
        addTask({ type: Actions.ADD_TASK, title });
      }}
    >
      <input
        type="text"
        name="task"
        value={input}
        id="task-name"
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

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

type ActionProps = { type: number; id?: number; title?: string };

enum Actions {
  ADD_TASK,
}

const App = () => {
  const tasksData: Task[] = [{
    id: Date.now(),
    title: "ride to ladakh",
    isDone: false,
  }, {
    id: Date.now(),
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

  const reducer = (baseState: Task[], action: ActionProps): Task[] => {
    const drafts: Task[] = produce(baseState, (x: Task): Task => x);

    switch (action.type) {
      case Actions.ADD_TASK:
        return [...drafts, {
          id: Date.now(),
          title: action.title as string,
          isDone: false,
        }];
    }

    return drafts;
  };

  const dispatch = (action: ActionProps): void =>
    setTasks(reducer(tasks, action));

  // const addTask = (action: ActionProps): void =>
  //   setTasks(reducer(tasks, action));

  return (
    <div>
      <Input addTask={dispatch} />
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
