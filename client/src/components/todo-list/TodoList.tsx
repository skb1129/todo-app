import React, { useCallback, useState } from "react";
import { useLocation } from "react-router";

import { useTodo } from "../../contexts/TodoContext";
import Todo from "../todo/Todo";

import "./TodoList.scss";

function TodoList() {
  const classes = {
    wrapper: "todo_list-wrapper",
    inputWrapper: "todo_list-input_wrapper",
    input: "todo_list-input",
    button: "todo_list-button",
    items: "todo_list-items",
  };
  const [value, setValue] = useState("");
  const { todos, addTodo } = useTodo();
  const { search } = useLocation();
  const bucket = new URLSearchParams(search).get("bucket");

  const createTodo = useCallback(() => {
    addTodo(value);
    setValue("");
  }, [value, setValue, addTodo]);

  const onKeyPress = useCallback(
    (event) => {
      const key = event.keyCode || event.which;
      key === 13 && createTodo();
    },
    [createTodo]
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        <input
          className={classes.input}
          type="text"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onKeyPress={onKeyPress}
        />
        <button className={classes.button} onClick={createTodo}>
          Create To-do
        </button>
      </div>
      <div className={classes.items}>
        {todos.map((todo) => {
          if (bucket && todo.bucket !== bucket) return;
          return <Todo key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
}

export default TodoList;
