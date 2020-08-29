import React from "react";

import Buckets from "./components/buckets/Buckets";
import TodoList from "./components/todo-list/TodoList";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "app-wrapper",
  };

  // const onKeyPress = useCallback(
  //   (event) => {
  //     const key = event.keyCode || event.which;
  //     key === 13 && addTodo();
  //   },
  //   [addTodo]
  // );

  return (
    <div data-testid="app" className={styles.wrapper}>
      <Buckets />
      <TodoList />
    </div>
  );
}

export default App;
