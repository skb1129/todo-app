import React from "react";

import Buckets from "./components/buckets/Buckets";
import TodoList from "./components/todo-list/TodoList";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "app-wrapper",
  };

  return (
    <div data-testid="app" className={styles.wrapper}>
      <Buckets />
      <TodoList />
    </div>
  );
}

export default App;
