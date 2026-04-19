import Todo from "./Todo";

const Navbar = ({
  todos,
  newTodoHandler,
  todoSelectionHandler,
  todoHanlders,
}) => {
  return (
    <nav id="nav-bar">
      {todos.length > 0 &&
        todos.map((todo, id) => <Todo key={id} hanlders={todoHanlders} />)}
    </nav>
  );
};

export default Navbar;
