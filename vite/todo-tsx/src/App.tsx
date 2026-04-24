import Input from "./components/Input.tsx";
import Todo from "./components/Todo.tsx";
import TodoProvider from "./context/TodoProvider.js";

const App = () => {
  return (
    <TodoProvider>
      <Input />
      <Todo />
    </TodoProvider>
  );
};


export default App;
