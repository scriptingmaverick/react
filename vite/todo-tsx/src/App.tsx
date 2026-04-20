import { produce } from "immer";
import { useState } from "react";

const Task = (
  { taskData: { title, isDone, id }, handler }: TaskProps,
) => (
  <div>
    <span>
      {!isDone ? "❌" : "✅"}
      {title}
    </span>

    <span>
      <button onClick={() => handler({ type: Actions.TOGGLE_TASK, id })}>
        Toggle
      </button>
      <button onClick={() => handler({ type: Actions.REMOVE_TASK, id })}>
        Remove
      </button>
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
  handler: (action: ActionProps) => void;
};

type ActionProps = { type: number; id?: number; title?: string };

enum Actions {
  ADD_TASK,
  TOGGLE_TASK,
  REMOVE_TASK,
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

  const reducer = (baseState: Task[], action: ActionProps): Task[] => {
    switch (action.type) {
      case Actions.ADD_TASK: {
        const drafts: Task[] = produce(baseState, (x: Task): Task => x);

        return [...drafts, {
          id: Date.now(),
          title: action.title as string,
          isDone: false,
        }];
      }

      case Actions.TOGGLE_TASK: {
        return produce(baseState, (draft) => {
          const task = draft.find(({ id }) => id === action.id) as Task;
          task.isDone = !task.isDone;
        });
      }

      case Actions.REMOVE_TASK: {
        return produce(baseState, (draft) => {
          const taskIndex = draft.findIndex(({ id }) => id === action.id);
          draft.splice(taskIndex, 1);
        });
      }
    }

    return baseState;
  };

  const dispatch = (action: ActionProps): void =>
    setTasks(reducer(tasks, action));

  return (
    <div>
      <Input addTask={dispatch} />
      {tasks.length > 0 &&
        tasks.map((task) => (
          <Task
            key={task.id}
            taskData={task}
            handler={dispatch}
          />
        ))}
    </div>
  );
};

export default App;
