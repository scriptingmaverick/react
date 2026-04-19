import Button from "./Button";
import Input from "./Input";

const Todo = ({ handlers, data: { name, tasks, id }, currentTodoId }) => {
  return (
    <div
      id={id}
      className={`${+currentTodoId === id && "active-todo"} todo`}
      onClick={handlers.selectTodoHandler}
    >
      <Input className="todo-name" readonly={true}>
        {name}
      </Input>
      <div className="actions">
        <Button clickHandler={handlers.editTodoHandler}>Edit</Button>
        <Button clickHandler={handlers.removeTodoHandler}>Remove</Button>
      </div>
    </div>
  );
};

export default Todo;
