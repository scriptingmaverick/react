import { Actions, type TaskProps } from "../types";

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

export default Task;
