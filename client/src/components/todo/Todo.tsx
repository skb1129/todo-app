import React, { useCallback } from "react";

import { useTodo } from "../../contexts/TodoContext";
import { TodoItem } from "../../models";

import "./Todo.scss";

interface Props {
  todo: TodoItem;
}
function Todo({ todo }: Props) {
  const classes = {
    wrapper: "todo-wrapper",
    check: "todo-check",
    text: "todo-text",
  };
  const { updateTodo } = useTodo();
  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => updateTodo({ ...todo, done: target.checked }),
    [updateTodo]
  );
  return (
    <div className={classes.wrapper}>
      <input className={classes.check} type="checkbox" checked={todo.done} onChange={onChange} />
      <p className={classes.text}>{todo.description}</p>
    </div>
  );
}

export default Todo;
