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
    flex: "todo-flex",
    check: "todo-check",
    text: "todo-text",
    textDone: "todo-text-done",
    delete: "todo-delete",
  };
  const { updateTodo, deleteTodo } = useTodo();
  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => updateTodo({ ...todo, done: target.checked }),
    [updateTodo]
  );
  return (
    <div className={classes.wrapper}>
      <div className={classes.flex}>
        <input className={classes.check} type="checkbox" checked={todo.done} onChange={onChange} />
        <p className={classNames(classes.text, todo.done ? classes.textDone : "")}>{todo.description}</p>
      </div>
      <button className={classes.delete} onClick={() => deleteTodo(todo.id)} title="Delete To-Do">
        X
      </button>
    </div>
  );
}

export default Todo;
