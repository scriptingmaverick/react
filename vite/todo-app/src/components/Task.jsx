import Button from "./Button";
import Input from "./Input";

const Task = ({
  task: { name, isCompleted },
  handlers: { removeTaskHandler, toggleTaskHandler },
  id,
}) => {
  return (
    <div className="task" id={id}>
      <div className="task-data">
        <span className="status">{isCompleted ? "✅" : "❌"}</span>
        <Input className="task-name" readonly={true}>
          {name}
        </Input>
      </div>
      <div className="actions">
        <Button clickHandler={toggleTaskHandler}>Toggle</Button>
        <Button clickHandler={removeTaskHandler}>Delete</Button>
      </div>
    </div>
  );
};

export default Task;
