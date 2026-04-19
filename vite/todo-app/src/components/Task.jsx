import Button from "./Button";

const Task = ({
  task: { name, isCompleted },
  handlers: { removeTaskHandler, toggleTaskHandler },
  id,
}) => {
  return (
    <div className="task" id={id}>
      <span className="name">
        {name} {isCompleted ? "✅" : "❌"}
      </span>
      <div className="actions">
        <Button clickHandler={toggleTaskHandler}>Toggle</Button>
        <Button clickHandler={removeTaskHandler}>Delete</Button>
      </div>
    </div>
  );
};

export default Task;
