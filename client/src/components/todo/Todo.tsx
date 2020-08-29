import React, { useCallback } from "react";
import classNames from "classnames";

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
    textDone: "todo-text-done",
  };
  const { updateTodo } = useTodo();
  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => updateTodo({ ...todo, done: target.checked }),
    [updateTodo]
  );
  return (
    <div className={classes.wrapper}>
      <input className={classes.check} type="checkbox" checked={todo.done} onChange={onChange} />
      <p className={classNames(classes.text, todo.done ? classes.textDone : "")}>{todo.description}</p>
    </div>
  );
}

export default Todo;
