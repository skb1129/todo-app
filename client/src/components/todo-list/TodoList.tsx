import React, { useCallback, useMemo, useState } from "react";
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
  const bucket = useMemo(() => new URLSearchParams(search).get("bucket"), [search]);

  const createTodo = useCallback(() => {
    addTodo(value, bucket);
    setValue("");
  }, [value, setValue, addTodo, bucket]);

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
          placeholder="To-Do description"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onKeyPress={onKeyPress}
        />
        <button className={classes.button} onClick={createTodo}>
          Create To-Do {bucket ? `in ${bucket}` : ""}
        </button>
      </div>
      <div className={classes.items}>
        <div>
          {todos.map((todo) => {
            if (bucket && todo.bucket !== bucket) return;
            return <Todo key={todo.id} todo={todo} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
