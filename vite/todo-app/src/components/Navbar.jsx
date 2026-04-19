import Input from "./Input";
import Todo from "./Todo";

const Navbar = ({ todos, handlers }) => {
  return (
    <nav id="navbar">
      <Input
        name="todo"
        canBePlaceholder={true}
        handler={handlers.newTodoHandler}
      >
        Add a todo
      </Input>

      <div id="todo-section">
        <h2>Todos</h2>
        <div id="todos">
          {todos.length > 0 &&
            todos.map((todo, id) => (
              <Todo key={id} handlers={handlers} data={{ id, ...todo }} />
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
